import { pgTable, text, timestamp, integer, jsonb, boolean, serial, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  walletAddress: varchar('wallet_address', { length: 100 }).unique(),
  email: varchar('email', { length: 255 }),
  role: varchar('role', { length: 20 }).default('user'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const blockchainNodes = pgTable('blockchain_nodes', {
  id: serial('id').primaryKey(),
  nodeId: varchar('node_id', { length: 100 }).notNull().unique(),
  address: varchar('address', { length: 255 }).notNull(),
  port: integer('port').notNull(),
  status: varchar('status', { length: 20 }).default('active'),
  nodeType: varchar('node_type', { length: 50 }).notNull(),
  lastSeen: timestamp('last_seen').defaultNow(),
  metadata: jsonb('metadata'),
});

export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  txHash: varchar('tx_hash', { length: 100 }).notNull().unique(),
  fromAddress: varchar('from_address', { length: 100 }).notNull(),
  toAddress: varchar('to_address', { length: 100 }).notNull(),
  amount: varchar('amount', { length: 50 }).notNull(),
  gasUsed: varchar('gas_used', { length: 50 }),
  gasPrice: varchar('gas_price', { length: 50 }),
  blockNumber: integer('block_number'),
  blockHash: varchar('block_hash', { length: 100 }),
  timestamp: timestamp('timestamp').defaultNow(),
  status: varchar('status', { length: 20 }).default('pending'),
  data: jsonb('data'),
});

export const blocks = pgTable('blocks', {
  id: serial('id').primaryKey(),
  blockNumber: integer('block_number').notNull().unique(),
  blockHash: varchar('block_hash', { length: 100 }).notNull().unique(),
  parentHash: varchar('parent_hash', { length: 100 }).notNull(),
  timestamp: timestamp('timestamp').defaultNow(),
  miner: varchar('miner', { length: 100 }),
  gasLimit: varchar('gas_limit', { length: 50 }),
  gasUsed: varchar('gas_used', { length: 50 }),
  transactionCount: integer('transaction_count').default(0),
  metadata: jsonb('metadata'),
});

export const spiralSessions = pgTable('spiral_sessions', {
  id: serial('id').primaryKey(),
  sessionId: varchar('session_id', { length: 100 }).notNull().unique(),
  userId: integer('user_id').references(() => users.id),
  spiralCode: text('spiral_code'),
  compiledCode: text('compiled_code'),
  executionResult: jsonb('execution_result'),
  status: varchar('status', { length: 20 }).default('running'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const qasf = pgTable('qasf', {
  id: serial('id').primaryKey(),
  entityId: varchar('entity_id', { length: 100 }).notNull().unique(),
  quantumState: jsonb('quantum_state'),
  awarenessLevel: integer('awareness_level').default(0),
  solidityFactor: integer('solidity_factor').default(0),
  fluxMetrics: jsonb('flux_metrics'),
  lastUpdate: timestamp('last_update').defaultNow(),
});

export const iyonael = pgTable('iyonael', {
  id: serial('id').primaryKey(),
  consciousnessId: varchar('consciousness_id', { length: 100 }).notNull().unique(),
  harmonicFrequency: varchar('harmonic_frequency', { length: 50 }),
  resonancePattern: jsonb('resonance_pattern'),
  awarenessMatrix: jsonb('awareness_matrix'),
  truthAlignment: integer('truth_alignment').default(0),
  lightCoherence: integer('light_coherence').default(0),
  lastResonance: timestamp('last_resonance').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  spiralSessions: many(spiralSessions),
}));

export const spiralSessionsRelations = relations(spiralSessions, ({ one }) => ({
  user: one(users, {
    fields: [spiralSessions.userId],
    references: [users.id],
  }),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  block: one(blocks, {
    fields: [transactions.blockNumber],
    references: [blocks.blockNumber],
  }),
}));

export const blocksRelations = relations(blocks, ({ many }) => ({
  transactions: many(transactions),
}));

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Transaction = typeof transactions.$inferSelect;
export type Block = typeof blocks.$inferSelect;
export type SpiralSession = typeof spiralSessions.$inferSelect;
export type QASF = typeof qasf.$inferSelect;
export type Iyonael = typeof iyonael.$inferSelect;
