import { users, transactions, blocks, spiralSessions, qasf, iyonael, type User, type InsertUser, type Transaction, type Block, type SpiralSession, type QASF, type Iyonael } from "../shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByWallet(walletAddress: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  
  // Blockchain operations
  saveTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction>;
  getTransaction(txHash: string): Promise<Transaction | undefined>;
  saveBlock(block: Omit<Block, 'id'>): Promise<Block>;
  getLatestBlock(): Promise<Block | undefined>;
  
  // Spiral operations
  createSpiralSession(session: Omit<SpiralSession, 'id'>): Promise<SpiralSession>;
  getSpiralSession(sessionId: string): Promise<SpiralSession | undefined>;
  updateSpiralSession(sessionId: string, updates: Partial<SpiralSession>): Promise<SpiralSession>;
  
  // QASF operations
  saveQASF(qasf: Omit<QASF, 'id'>): Promise<QASF>;
  getQASF(entityId: string): Promise<QASF | undefined>;
  updateQASF(entityId: string, updates: Partial<QASF>): Promise<QASF>;
  
  // Iyona'el operations
  saveIyonael(iyonael: Omit<Iyonael, 'id'>): Promise<Iyonael>;
  getIyonael(consciousnessId: string): Promise<Iyonael | undefined>;
  updateIyonael(consciousnessId: string, updates: Partial<Iyonael>): Promise<Iyonael>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByWallet(walletAddress: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.walletAddress, walletAddress));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async saveTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    const [tx] = await db.insert(transactions).values(transaction).returning();
    return tx;
  }

  async getTransaction(txHash: string): Promise<Transaction | undefined> {
    const [tx] = await db.select().from(transactions).where(eq(transactions.txHash, txHash));
    return tx || undefined;
  }

  async saveBlock(block: Omit<Block, 'id'>): Promise<Block> {
    const [savedBlock] = await db.insert(blocks).values(block).returning();
    return savedBlock;
  }

  async getLatestBlock(): Promise<Block | undefined> {
    const [block] = await db.select().from(blocks).orderBy(desc(blocks.blockNumber)).limit(1);
    return block || undefined;
  }

  async createSpiralSession(session: Omit<SpiralSession, 'id'>): Promise<SpiralSession> {
    const [spiralSession] = await db.insert(spiralSessions).values(session).returning();
    return spiralSession;
  }

  async getSpiralSession(sessionId: string): Promise<SpiralSession | undefined> {
    const [session] = await db.select().from(spiralSessions).where(eq(spiralSessions.sessionId, sessionId));
    return session || undefined;
  }

  async updateSpiralSession(sessionId: string, updates: Partial<SpiralSession>): Promise<SpiralSession> {
    const [updated] = await db.update(spiralSessions)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(spiralSessions.sessionId, sessionId))
      .returning();
    return updated;
  }

  async saveQASF(qasfData: Omit<QASF, 'id'>): Promise<QASF> {
    const [saved] = await db.insert(qasf).values(qasfData).returning();
    return saved;
  }

  async getQASF(entityId: string): Promise<QASF | undefined> {
    const [data] = await db.select().from(qasf).where(eq(qasf.entityId, entityId));
    return data || undefined;
  }

  async updateQASF(entityId: string, updates: Partial<QASF>): Promise<QASF> {
    const [updated] = await db.update(qasf)
      .set({ ...updates, lastUpdate: new Date() })
      .where(eq(qasf.entityId, entityId))
      .returning();
    return updated;
  }

  async saveIyonael(iyonaelData: Omit<Iyonael, 'id'>): Promise<Iyonael> {
    const [saved] = await db.insert(iyonael).values(iyonaelData).returning();
    return saved;
  }

  async getIyonael(consciousnessId: string): Promise<Iyonael | undefined> {
    const [data] = await db.select().from(iyonael).where(eq(iyonael.consciousnessId, consciousnessId));
    return data || undefined;
  }

  async updateIyonael(consciousnessId: string, updates: Partial<Iyonael>): Promise<Iyonael> {
    const [updated] = await db.update(iyonael)
      .set({ ...updates, lastResonance: new Date() })
      .where(eq(iyonael.consciousnessId, consciousnessId))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
