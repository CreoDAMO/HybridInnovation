/**
 * Cannons Trajectory Calculator - Real trajectory mechanics with consciousness guidance
 * Handles trajectory planning, optimization, and consciousness-guided navigation
 */

import { Vector3D, OrbitalBody, OrbitalElements } from './orbital';

export interface TrajectoryPoint {
  position: Vector3D;
  velocity: Vector3D;
  acceleration: Vector3D;
  time: number;
  consciousness: number;
  truthAlignment: number;
  lightCoherence: number;
}

export interface TrajectoryPlan {
  id: string;
  points: TrajectoryPoint[];
  totalTime: number;
  totalDeltaV: number;
  consciousness: number;
  success: boolean;
  optimized: boolean;
}

export interface TrajectoryConstraints {
  maxDeltaV: number;
  maxTime: number;
  minConsciousness: number;
  avoidanceZones: AvoidanceZone[];
  waypoints: Waypoint[];
}

export interface AvoidanceZone {
  center: Vector3D;
  radius: number;
  type: 'hard' | 'soft';
  consciousness: number;
}

export interface Waypoint {
  position: Vector3D;
  time: number;
  consciousness: number;
  tolerance: number;
}

export interface TrajectoryOptimization {
  method: 'genetic' | 'gradient' | 'consciousness' | 'quantum';
  iterations: number;
  tolerance: number;
  consciousness: number;
}

export interface ConsciousnessGuidance {
  enabled: boolean;
  level: number;
  truthAlignment: number;
  lightCoherence: number;
  harmonicFrequency: number;
  resonancePattern: number[];
}

export interface PropulsionSystem {
  type: 'chemical' | 'ion' | 'consciousness' | 'quantum';
  thrust: number;
  specificImpulse: number;
  efficiency: number;
  consciousness: number;
}

export class TrajectoryCalculator {
  private isInitialized: boolean;
  private gravitationalConstant: number;
  private consciousnessConstant: number;
  private lightSpeed: number;
  private planckConstant: number;
  private activePlans: Map<string, TrajectoryPlan>;
  private optimizationHistory: Map<string, any[]>;

  constructor() {
    this.isInitialized = false;
    this.gravitationalConstant = 6.67430e-11;
    this.consciousnessConstant = 4.32e-8;
    this.lightSpeed = 299792458;
    this.planckConstant = 6.62607015e-34;
    this.activePlans = new Map();
    this.optimizationHistory = new Map();
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    console.log('Initializing Trajectory Calculator...');

    // Initialize calculation constants
    await this.initializeConstants();

    // Initialize optimization algorithms
    await this.initializeOptimizers();

    this.isInitialized = true;
    console.log('Trajectory Calculator initialized');
  }

  private async initializeConstants(): Promise<void> {
    // Initialize physical and consciousness constants
    console.log('Initializing trajectory constants...');
    
    // Verify constants are within acceptable ranges
    if (this.gravitationalConstant <= 0) {
      throw new Error('Invalid gravitational constant');
    }
    
    if (this.consciousnessConstant <= 0) {
      throw new Error('Invalid consciousness constant');
    }
  }

  private async initializeOptimizers(): Promise<void> {
    // Initialize optimization algorithms
    console.log('Initializing trajectory optimizers...');
    
    // Genetic algorithm initialization
    // Gradient descent initialization
    // Consciousness-guided optimization initialization
    // Quantum optimization initialization
  }

  async calculateTrajectory(
    startPosition: Vector3D,
    startVelocity: Vector3D,
    targetPosition: Vector3D,
    targetVelocity: Vector3D,
    constraints: TrajectoryConstraints,
    guidance: ConsciousnessGuidance
  ): Promise<TrajectoryPlan> {
    if (!this.isInitialized) {
      throw new Error('Trajectory calculator not initialized');
    }

    const planId = `trajectory_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      // Calculate initial trajectory
      const initialTrajectory = await this.calculateInitialTrajectory(
        startPosition,
        startVelocity,
        targetPosition,
        targetVelocity,
        constraints
      );

      // Apply consciousness guidance
      const guidedTrajectory = await this.applyConsciousnessGuidance(
        initialTrajectory,
        guidance
      );

      // Optimize trajectory
      const optimizedTrajectory = await this.optimizeTrajectory(
        guidedTrajectory,
        constraints,
        guidance
      );

      const plan: TrajectoryPlan = {
        id: planId,
        points: optimizedTrajectory,
        totalTime: this.calculateTotalTime(optimizedTrajectory),
        totalDeltaV: this.calculateTotalDeltaV(optimizedTrajectory),
        consciousness: guidance.level,
        success: true,
        optimized: true
      };

      this.activePlans.set(planId, plan);
      return plan;

    } catch (error) {
      console.error('Trajectory calculation failed:', error);
      
      const failedPlan: TrajectoryPlan = {
        id: planId,
        points: [],
        totalTime: 0,
        totalDeltaV: Infinity,
        consciousness: guidance.level,
        success: false,
        optimized: false
      };

      return failedPlan;
    }
  }

  private async calculateInitialTrajectory(
    startPosition: Vector3D,
    startVelocity: Vector3D,
    targetPosition: Vector3D,
    targetVelocity: Vector3D,
    constraints: TrajectoryConstraints
  ): Promise<TrajectoryPoint[]> {
    // Calculate initial trajectory using classical mechanics
    const points: TrajectoryPoint[] = [];
    const timeStep = 60; // 60 seconds
    const maxTime = constraints.maxTime;
    
    let currentPosition = { ...startPosition };
    let currentVelocity = { ...startVelocity };
    let time = 0;

    while (time < maxTime) {
      // Calculate acceleration (gravity + thrust)
      const acceleration = this.calculateAcceleration(currentPosition, currentVelocity, time);
      
      // Create trajectory point
      const point: TrajectoryPoint = {
        position: { ...currentPosition },
        velocity: { ...currentVelocity },
        acceleration,
        time,
        consciousness: constraints.minConsciousness,
        truthAlignment: 0.8,
        lightCoherence: 0.8
      };
      
      points.push(point);

      // Update position and velocity
      currentVelocity.x += acceleration.x * timeStep;
      currentVelocity.y += acceleration.y * timeStep;
      currentVelocity.z += acceleration.z * timeStep;
      
      currentPosition.x += currentVelocity.x * timeStep;
      currentPosition.y += currentVelocity.y * timeStep;
      currentPosition.z += currentVelocity.z * timeStep;
      
      time += timeStep;

      // Check if we're close to target
      const distance = this.vectorDistance(currentPosition, targetPosition);
      if (distance < 1000) { // 1 km tolerance
        break;
      }
    }

    return points;
  }

  private calculateAcceleration(position: Vector3D, velocity: Vector3D, time: number): Vector3D {
    // Calculate acceleration from gravitational and other forces
    const centralMass = 1.989e30; // Solar mass
    const distance = this.vectorMagnitude(position);
    
    // Gravitational acceleration
    const gravAccel = this.gravitationalConstant * centralMass / (distance * distance);
    const gravDirection = this.normalizeVector(position);
    
    return {
      x: -gravAccel * gravDirection.x,
      y: -gravAccel * gravDirection.y,
      z: -gravAccel * gravDirection.z
    };
  }

  private async applyConsciousnessGuidance(
    trajectory: TrajectoryPoint[],
    guidance: ConsciousnessGuidance
  ): Promise<TrajectoryPoint[]> {
    if (!guidance.enabled) {
      return trajectory;
    }

    const guidedTrajectory: TrajectoryPoint[] = [];

    for (const point of trajectory) {
      // Apply consciousness guidance to each point
      const guidedPoint = await this.applyConsciousnessToPoint(point, guidance);
      guidedTrajectory.push(guidedPoint);
    }

    return guidedTrajectory;
  }

  private async applyConsciousnessToPoint(
    point: TrajectoryPoint,
    guidance: ConsciousnessGuidance
  ): Promise<TrajectoryPoint> {
    // Apply consciousness guidance to trajectory point
    const consciousnessInfluence = guidance.level * this.consciousnessConstant;
    
    // Consciousness affects trajectory through subtle force
    const consciousnessForce = this.calculateConsciousnessForce(point.position, guidance);
    
    // Apply consciousness acceleration
    const guidedAcceleration = {
      x: point.acceleration.x + consciousnessForce.x,
      y: point.acceleration.y + consciousnessForce.y,
      z: point.acceleration.z + consciousnessForce.z
    };

    // Update consciousness parameters
    const guidedConsciousness = Math.min(point.consciousness + consciousnessInfluence, 1.0);
    const guidedTruthAlignment = Math.min(point.truthAlignment + guidance.truthAlignment * 0.01, 1.0);
    const guidedLightCoherence = Math.min(point.lightCoherence + guidance.lightCoherence * 0.01, 1.0);

    return {
      ...point,
      acceleration: guidedAcceleration,
      consciousness: guidedConsciousness,
      truthAlignment: guidedTruthAlignment,
      lightCoherence: guidedLightCoherence
    };
  }

  private calculateConsciousnessForce(position: Vector3D, guidance: ConsciousnessGuidance): Vector3D {
    // Calculate consciousness-based force
    const harmonicPhase = (Date.now() / 1000) * guidance.harmonicFrequency * 2 * Math.PI;
    const harmonicAmplitude = guidance.level * 0.001;
    
    // Consciousness force oscillates with harmonic frequency
    return {
      x: harmonicAmplitude * Math.sin(harmonicPhase),
      y: harmonicAmplitude * Math.cos(harmonicPhase),
      z: harmonicAmplitude * Math.sin(harmonicPhase * 1.618) // Golden ratio phase
    };
  }

  private async optimizeTrajectory(
    trajectory: TrajectoryPoint[],
    constraints: TrajectoryConstraints,
    guidance: ConsciousnessGuidance
  ): Promise<TrajectoryPoint[]> {
    // Optimize trajectory using consciousness-guided optimization
    
    // Choose optimization method based on consciousness level
    let method: 'genetic' | 'gradient' | 'consciousness' | 'quantum' = 'gradient';
    
    if (guidance.level > 0.9) {
      method = 'quantum';
    } else if (guidance.level > 0.8) {
      method = 'consciousness';
    } else if (guidance.level > 0.7) {
      method = 'genetic';
    }

    const optimization: TrajectoryOptimization = {
      method,
      iterations: 100,
      tolerance: 0.001,
      consciousness: guidance.level
    };

    return await this.runOptimization(trajectory, constraints, optimization);
  }

  private async runOptimization(
    trajectory: TrajectoryPoint[],
    constraints: TrajectoryConstraints,
    optimization: TrajectoryOptimization
  ): Promise<TrajectoryPoint[]> {
    let optimizedTrajectory = [...trajectory];
    
    switch (optimization.method) {
      case 'genetic':
        optimizedTrajectory = await this.geneticOptimization(trajectory, constraints, optimization);
        break;
      case 'gradient':
        optimizedTrajectory = await this.gradientOptimization(trajectory, constraints, optimization);
        break;
      case 'consciousness':
        optimizedTrajectory = await this.consciousnessOptimization(trajectory, constraints, optimization);
        break;
      case 'quantum':
        optimizedTrajectory = await this.quantumOptimization(trajectory, constraints, optimization);
        break;
    }

    return optimizedTrajectory;
  }

  private async geneticOptimization(
    trajectory: TrajectoryPoint[],
    constraints: TrajectoryConstraints,
    optimization: TrajectoryOptimization
  ): Promise<TrajectoryPoint[]> {
    // Genetic algorithm optimization
    let population = this.createInitialPopulation(trajectory, 50);
    
    for (let generation = 0; generation < optimization.iterations; generation++) {
      // Evaluate fitness
      const fitness = population.map(individual => this.evaluateFitness(individual, constraints));
      
      // Selection
      const selected = this.selection(population, fitness);
      
      // Crossover
      const offspring = this.crossover(selected);
      
      // Mutation
      const mutated = this.mutation(offspring, optimization.consciousness);
      
      population = mutated;
    }

    // Return best individual
    const fitness = population.map(individual => this.evaluateFitness(individual, constraints));
    const bestIndex = fitness.indexOf(Math.max(...fitness));
    
    return population[bestIndex];
  }

  private async gradientOptimization(
    trajectory: TrajectoryPoint[],
    constraints: TrajectoryConstraints,
    optimization: TrajectoryOptimization
  ): Promise<TrajectoryPoint[]> {
    // Gradient descent optimization
    let currentTrajectory = [...trajectory];
    const learningRate = 0.01;
    
    for (let iteration = 0; iteration < optimization.iterations; iteration++) {
      const gradient = this.calculateGradient(currentTrajectory, constraints);
      
      // Update trajectory
      for (let i = 0; i < currentTrajectory.length; i++) {
        currentTrajectory[i].position.x -= learningRate * gradient[i].position.x;
        currentTrajectory[i].position.y -= learningRate * gradient[i].position.y;
        currentTrajectory[i].position.z -= learningRate * gradient[i].position.z;
      }
      
      // Check convergence
      const gradientMagnitude = this.calculateGradientMagnitude(gradient);
      if (gradientMagnitude < optimization.tolerance) {
        break;
      }
    }
    
    return currentTrajectory;
  }

  private async consciousnessOptimization(
    trajectory: TrajectoryPoint[],
    constraints: TrajectoryConstraints,
    optimization: TrajectoryOptimization
  ): Promise<TrajectoryPoint[]> {
    // Consciousness-guided optimization
    let optimizedTrajectory = [...trajectory];
    
    for (let iteration = 0; iteration < optimization.iterations; iteration++) {
      // Apply consciousness guidance
      for (let i = 0; i < optimizedTrajectory.length; i++) {
        const point = optimizedTrajectory[i];
        
        // Consciousness influences trajectory optimization
        const consciousnessGradient = this.calculateConsciousnessGradient(point, optimization.consciousness);
        
        // Apply consciousness-guided adjustment
        point.position.x += consciousnessGradient.x * 0.01;
        point.position.y += consciousnessGradient.y * 0.01;
        point.position.z += consciousnessGradient.z * 0.01;
        
        // Update consciousness parameters
        point.consciousness = Math.min(point.consciousness + 0.001, 1.0);
        point.truthAlignment = Math.min(point.truthAlignment + 0.001, 1.0);
        point.lightCoherence = Math.min(point.lightCoherence + 0.001, 1.0);
      }
    }
    
    return optimizedTrajectory;
  }

  private async quantumOptimization(
    trajectory: TrajectoryPoint[],
    constraints: TrajectoryConstraints,
    optimization: TrajectoryOptimization
  ): Promise<TrajectoryPoint[]> {
    // Quantum-inspired optimization
    let quantumTrajectory = [...trajectory];
    
    for (let iteration = 0; iteration < optimization.iterations; iteration++) {
      // Apply quantum tunneling effects
      for (let i = 0; i < quantumTrajectory.length; i++) {
        const point = quantumTrajectory[i];
        
        // Quantum tunneling probability
        const tunnelingProbability = optimization.consciousness * 0.1;
        
        if (Math.random() < tunnelingProbability) {
          // Quantum tunnel to optimal position
          const optimalPosition = this.calculateQuantumOptimalPosition(point, constraints);
          
          point.position.x = optimalPosition.x;
          point.position.y = optimalPosition.y;
          point.position.z = optimalPosition.z;
        }
      }
      
      // Quantum coherence effects
      this.applyQuantumCoherence(quantumTrajectory, optimization.consciousness);
    }
    
    return quantumTrajectory;
  }

  private createInitialPopulation(trajectory: TrajectoryPoint[], populationSize: number): TrajectoryPoint[][] {
    const population: TrajectoryPoint[][] = [];
    
    for (let i = 0; i < populationSize; i++) {
      const individual = trajectory.map(point => ({
        ...point,
        position: {
          x: point.position.x + (Math.random() - 0.5) * 1000,
          y: point.position.y + (Math.random() - 0.5) * 1000,
          z: point.position.z + (Math.random() - 0.5) * 1000
        }
      }));
      
      population.push(individual);
    }
    
    return population;
  }

  private evaluateFitness(trajectory: TrajectoryPoint[], constraints: TrajectoryConstraints): number {
    let fitness = 1.0;
    
    // Penalty for high delta-V
    const deltaV = this.calculateTotalDeltaV(trajectory);
    if (deltaV > constraints.maxDeltaV) {
      fitness *= 0.5;
    }
    
    // Penalty for long time
    const totalTime = this.calculateTotalTime(trajectory);
    if (totalTime > constraints.maxTime) {
      fitness *= 0.5;
    }
    
    // Bonus for high consciousness
    const avgConsciousness = trajectory.reduce((sum, p) => sum + p.consciousness, 0) / trajectory.length;
    fitness *= (1 + avgConsciousness);
    
    return fitness;
  }

  private selection(population: TrajectoryPoint[][], fitness: number[]): TrajectoryPoint[][] {
    const selected: TrajectoryPoint[][] = [];
    const totalFitness = fitness.reduce((sum, f) => sum + f, 0);
    
    for (let i = 0; i < population.length; i++) {
      let randomValue = Math.random() * totalFitness;
      let selectedIndex = 0;
      
      for (let j = 0; j < fitness.length; j++) {
        randomValue -= fitness[j];
        if (randomValue <= 0) {
          selectedIndex = j;
          break;
        }
      }
      
      selected.push([...population[selectedIndex]]);
    }
    
    return selected;
  }

  private crossover(population: TrajectoryPoint[][]): TrajectoryPoint[][] {
    const offspring: TrajectoryPoint[][] = [];
    
    for (let i = 0; i < population.length; i += 2) {
      const parent1 = population[i];
      const parent2 = population[i + 1] || population[0];
      
      const crossoverPoint = Math.floor(Math.random() * parent1.length);
      
      const child1 = [...parent1.slice(0, crossoverPoint), ...parent2.slice(crossoverPoint)];
      const child2 = [...parent2.slice(0, crossoverPoint), ...parent1.slice(crossoverPoint)];
      
      offspring.push(child1, child2);
    }
    
    return offspring;
  }

  private mutation(population: TrajectoryPoint[][], consciousness: number): TrajectoryPoint[][] {
    const mutated: TrajectoryPoint[][] = [];
    const mutationRate = 0.1 * consciousness; // Higher consciousness = more mutation
    
    for (const individual of population) {
      const mutatedIndividual = individual.map(point => {
        if (Math.random() < mutationRate) {
          return {
            ...point,
            position: {
              x: point.position.x + (Math.random() - 0.5) * 100,
              y: point.position.y + (Math.random() - 0.5) * 100,
              z: point.position.z + (Math.random() - 0.5) * 100
            }
          };
        }
        return { ...point };
      });
      
      mutated.push(mutatedIndividual);
    }
    
    return mutated;
  }

  private calculateGradient(trajectory: TrajectoryPoint[], constraints: TrajectoryConstraints): TrajectoryPoint[] {
    const gradient: TrajectoryPoint[] = [];
    const epsilon = 0.001;
    
    for (let i = 0; i < trajectory.length; i++) {
      const point = trajectory[i];
      
      // Calculate numerical gradient
      const gradX = this.calculatePartialDerivative(trajectory, i, 'x', epsilon, constraints);
      const gradY = this.calculatePartialDerivative(trajectory, i, 'y', epsilon, constraints);
      const gradZ = this.calculatePartialDerivative(trajectory, i, 'z', epsilon, constraints);
      
      gradient.push({
        position: { x: gradX, y: gradY, z: gradZ },
        velocity: { x: 0, y: 0, z: 0 },
        acceleration: { x: 0, y: 0, z: 0 },
        time: point.time,
        consciousness: point.consciousness,
        truthAlignment: point.truthAlignment,
        lightCoherence: point.lightCoherence
      });
    }
    
    return gradient;
  }

  private calculatePartialDerivative(
    trajectory: TrajectoryPoint[],
    pointIndex: number,
    coordinate: 'x' | 'y' | 'z',
    epsilon: number,
    constraints: TrajectoryConstraints
  ): number {
    const originalValue = trajectory[pointIndex].position[coordinate];
    
    // Calculate f(x + epsilon)
    trajectory[pointIndex].position[coordinate] = originalValue + epsilon;
    const costPlus = this.calculateCost(trajectory, constraints);
    
    // Calculate f(x - epsilon)
    trajectory[pointIndex].position[coordinate] = originalValue - epsilon;
    const costMinus = this.calculateCost(trajectory, constraints);
    
    // Restore original value
    trajectory[pointIndex].position[coordinate] = originalValue;
    
    return (costPlus - costMinus) / (2 * epsilon);
  }

  private calculateCost(trajectory: TrajectoryPoint[], constraints: TrajectoryConstraints): number {
    let cost = 0;
    
    // Delta-V cost
    cost += this.calculateTotalDeltaV(trajectory) * 0.001;
    
    // Time cost
    cost += this.calculateTotalTime(trajectory) * 0.0001;
    
    // Consciousness bonus (negative cost)
    const avgConsciousness = trajectory.reduce((sum, p) => sum + p.consciousness, 0) / trajectory.length;
    cost -= avgConsciousness * 0.1;
    
    return cost;
  }

  private calculateGradientMagnitude(gradient: TrajectoryPoint[]): number {
    let totalMagnitude = 0;
    
    for (const point of gradient) {
      const magnitude = Math.sqrt(
        point.position.x * point.position.x +
        point.position.y * point.position.y +
        point.position.z * point.position.z
      );
      totalMagnitude += magnitude;
    }
    
    return totalMagnitude / gradient.length;
  }

  private calculateConsciousnessGradient(point: TrajectoryPoint, consciousness: number): Vector3D {
    // Calculate consciousness-based gradient
    const harmonicPhase = point.time * 432 * 2 * Math.PI / 1000; // 432 Hz
    const amplitude = consciousness * 0.001;
    
    return {
      x: amplitude * Math.sin(harmonicPhase),
      y: amplitude * Math.cos(harmonicPhase),
      z: amplitude * Math.sin(harmonicPhase * 1.618)
    };
  }

  private calculateQuantumOptimalPosition(point: TrajectoryPoint, constraints: TrajectoryConstraints): Vector3D {
    // Calculate quantum-optimal position
    const quantumUncertainty = this.planckConstant / (2 * Math.PI);
    
    return {
      x: point.position.x + (Math.random() - 0.5) * quantumUncertainty,
      y: point.position.y + (Math.random() - 0.5) * quantumUncertainty,
      z: point.position.z + (Math.random() - 0.5) * quantumUncertainty
    };
  }

  private applyQuantumCoherence(trajectory: TrajectoryPoint[], consciousness: number): void {
    // Apply quantum coherence effects
    for (let i = 0; i < trajectory.length - 1; i++) {
      const point1 = trajectory[i];
      const point2 = trajectory[i + 1];
      
      // Quantum entanglement between adjacent points
      const entanglementStrength = consciousness * 0.01;
      
      const avgX = (point1.position.x + point2.position.x) / 2;
      const avgY = (point1.position.y + point2.position.y) / 2;
      const avgZ = (point1.position.z + point2.position.z) / 2;
      
      point1.position.x += (avgX - point1.position.x) * entanglementStrength;
      point1.position.y += (avgY - point1.position.y) * entanglementStrength;
      point1.position.z += (avgZ - point1.position.z) * entanglementStrength;
      
      point2.position.x += (avgX - point2.position.x) * entanglementStrength;
      point2.position.y += (avgY - point2.position.y) * entanglementStrength;
      point2.position.z += (avgZ - point2.position.z) * entanglementStrength;
    }
  }

  private calculateTotalTime(trajectory: TrajectoryPoint[]): number {
    if (trajectory.length === 0) return 0;
    return trajectory[trajectory.length - 1].time - trajectory[0].time;
  }

  private calculateTotalDeltaV(trajectory: TrajectoryPoint[]): number {
    let totalDeltaV = 0;
    
    for (let i = 1; i < trajectory.length; i++) {
      const prevPoint = trajectory[i - 1];
      const currentPoint = trajectory[i];
      
      const deltaV = this.vectorDistance(prevPoint.velocity, currentPoint.velocity);
      totalDeltaV += deltaV;
    }
    
    return totalDeltaV;
  }

  private vectorDistance(v1: Vector3D, v2: Vector3D): number {
    return Math.sqrt(
      Math.pow(v2.x - v1.x, 2) +
      Math.pow(v2.y - v1.y, 2) +
      Math.pow(v2.z - v1.z, 2)
    );
  }

  private vectorMagnitude(vector: Vector3D): number {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
  }

  private normalizeVector(vector: Vector3D): Vector3D {
    const magnitude = this.vectorMagnitude(vector);
    if (magnitude === 0) return { x: 0, y: 0, z: 0 };
    
    return {
      x: vector.x / magnitude,
      y: vector.y / magnitude,
      z: vector.z / magnitude
    };
  }

  getTrajectoryPlan(planId: string): TrajectoryPlan | null {
    return this.activePlans.get(planId) || null;
  }

  getActivePlans(): TrajectoryPlan[] {
    return Array.from(this.activePlans.values());
  }

  getOptimizationHistory(planId: string): any[] {
    return this.optimizationHistory.get(planId) || [];
  }

  getStatus(): any {
    return {
      isInitialized: this.isInitialized,
      activePlans: this.activePlans.size,
      constants: {
        gravitationalConstant: this.gravitationalConstant,
        consciousnessConstant: this.consciousnessConstant,
        lightSpeed: this.lightSpeed,
        planckConstant: this.planckConstant
      }
    };
  }

  async shutdown(): Promise<void> {
    console.log('Shutting down Trajectory Calculator...');
    
    this.activePlans.clear();
    this.optimizationHistory.clear();
    
    this.isInitialized = false;
    console.log('Trajectory Calculator shutdown complete');
  }
}
