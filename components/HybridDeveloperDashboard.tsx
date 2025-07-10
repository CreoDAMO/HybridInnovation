'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Cpu, 
  Zap, 
  Database, 
  Coins, 
  Bot, 
  Globe,
  Shield,
  TrendingUp,
  Activity,
  Sparkles,
  Rocket,
  Brain,
  Eye,
  Settings,
  BarChart3,
  Users,
  Wifi,
  Layers
} from 'lucide-react';
import { nvidiaIntegration } from '@/lib/nvidia-dgx-integration';

export function HybridDeveloperDashboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dgxMetrics, setDgxMetrics] = useState({
    gpuUtilization: 0,
    memoryUsage: 0,
    networkThroughput: '0 Gbps',
    activeInstances: 0,
    cost: '$0/hour'
  });

  const [hybridMetrics, setHybridMetrics] = useState({
    coinPrice: '$10.00',
    marketCap: '$1,000,000,000,000',
    totalSupply: '100,000,000,000',
    validators: 21,
    tps: 2500,
    gaslessUsers: 89234,
    aiAgents: 2456,
    usdcPool: '125.6M',
    defiTVL: '12.5B'
  });

  const [deploymentStatus, setDeploymentStatus] = useState({
    tensorRT: 'Optimizing',
    triton: 'Running',
    rapids: 'Active',
    omniverse: 'Initializing',
    dgxCloud: 'Connected'
  });

  const [ngcCatalog, setNgcCatalog] = useState([
    {
      name: 'TensorRT-LLM',
      category: 'AI/ML',
      status: 'deployed',
      performance: { fps: 120, memory: 2.4 }
    },
    {
      name: 'Triton Inference Server',
      category: 'Inference',
      status: 'running',
      performance: { fps: 95, memory: 1.8 }
    },
    {
      name: 'RAPIDS cuDF',
      category: 'Data Science',
      status: 'active',
      performance: { fps: 150, memory: 3.2 }
    },
    {
      name: 'Omniverse Kit',
      category: '3D/Simulation',
      status: 'building',
      performance: { fps: 90, memory: 3.8 }
    }
  ]);

  // Initialize Three.js scene for holographic display
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 800/600, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });

    renderer.setSize(800, 600);
    renderer.setClearColor(0x000000, 0);

    // Create holographic spiral
    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x00ffff, 
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Add holographic particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x00ffaa,
      transparent: true,
      opacity: 0.6
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 30;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.02;

      particlesMesh.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  // Fetch DGX metrics
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const metrics = await nvidiaIntegration.getResourceMetrics();
        setDgxMetrics(metrics);
      } catch (error) {
        console.error('Failed to fetch DGX metrics:', error);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  // Deploy AI models to DGX Cloud
  const deployAIModels = async () => {
    try {
      const result = await nvidiaIntegration.deployHybridAIModels();
      if (result.success) {
        setDeploymentStatus(prev => ({
          ...prev,
          dgxCloud: 'Deployed',
          tensorRT: 'Active'
        }));
      }
    } catch (error) {
      console.error('Deployment failed:', error);
    }
  };

  // Optimize with TensorRT
  const optimizeWithTensorRT = async () => {
    try {
      const result = await nvidiaIntegration.optimizeWithTensorRT();
      if (result.success) {
        setDeploymentStatus(prev => ({
          ...prev,
          tensorRT: 'Optimized'
        }));
      }
    } catch (error) {
      console.error('TensorRT optimization failed:', error);
    }
  };

  // Initialize Omniverse
  const initializeOmniverse = async () => {
    try {
      const result = await nvidiaIntegration.initializeOmniverse();
      if (result.success) {
        setDeploymentStatus(prev => ({
          ...prev,
          omniverse: 'Active'
        }));
      }
    } catch (error) {
      console.error('Omniverse initialization failed:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed':
      case 'running':
      case 'active':
      case 'Active':
      case 'Optimized':
        return 'bg-green-500';
      case 'building':
      case 'Optimizing':
      case 'Initializing':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            HYBRID Developer Dashboard
          </h1>
          <p className="text-xl text-gray-300">
            NVIDIA DGX Cloud Integration + NGC Catalog + HYBRID Blockchain
          </p>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <Badge className="bg-green-500/20 text-green-400 border-green-500">DGX CLOUD</Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500">TENSORRT</Badge>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500">TRITON</Badge>
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500">RAPIDS</Badge>
            <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500">OMNIVERSE</Badge>
          </div>
        </div>

        {/* DGX Cloud Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="bg-slate-800/50 border-green-500/30">
            <CardContent className="p-4 text-center">
              <Cpu className="w-6 h-6 mx-auto mb-2 text-green-400" />
              <div className="text-2xl font-bold text-green-400">{dgxMetrics.gpuUtilization}%</div>
              <div className="text-sm text-gray-400">GPU Utilization</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-blue-500/30">
            <CardContent className="p-4 text-center">
              <Database className="w-6 h-6 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-blue-400">{dgxMetrics.memoryUsage}%</div>
              <div className="text-sm text-gray-400">Memory Usage</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <Wifi className="w-6 h-6 mx-auto mb-2 text-purple-400" />
              <div className="text-2xl font-bold text-purple-400">{dgxMetrics.networkThroughput}</div>
              <div className="text-sm text-gray-400">Network</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-orange-500/30">
            <CardContent className="p-4 text-center">
              <Layers className="w-6 h-6 mx-auto mb-2 text-orange-400" />
              <div className="text-2xl font-bold text-orange-400">{dgxMetrics.activeInstances}</div>
              <div className="text-sm text-gray-400">Active Instances</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-red-500/30">
            <CardContent className="p-4 text-center">
              <Coins className="w-6 h-6 mx-auto mb-2 text-red-400" />
              <div className="text-2xl font-bold text-red-400">{dgxMetrics.cost}</div>
              <div className="text-sm text-gray-400">Hourly Cost</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="dgx-cloud" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dgx-cloud">DGX Cloud</TabsTrigger>
            <TabsTrigger value="ngc-catalog">NGC Catalog</TabsTrigger>
            <TabsTrigger value="holographic">Holographic</TabsTrigger>
            <TabsTrigger value="hybrid-metrics">HYBRID Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="dgx-cloud" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-green-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-green-400" />
                    DGX Cloud Deployment
                  </CardTitle>
                  <CardDescription>
                    Deploy HYBRID AI models to NVIDIA DGX Cloud
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm font-medium">TensorRT</div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(deploymentStatus.tensorRT)}`} />
                        <span className="text-sm">{deploymentStatus.tensorRT}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Triton</div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(deploymentStatus.triton)}`} />
                        <span className="text-sm">{deploymentStatus.triton}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">RAPIDS</div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(deploymentStatus.rapids)}`} />
                        <span className="text-sm">{deploymentStatus.rapids}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Omniverse</div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(deploymentStatus.omniverse)}`} />
                        <span className="text-sm">{deploymentStatus.omniverse}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={deployAIModels} className="flex-1 bg-green-600 hover:bg-green-700">
                      <Rocket className="w-4 h-4 mr-2" />
                      Deploy AI Models
                    </Button>
                    <Button onClick={optimizeWithTensorRT} className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <Zap className="w-4 h-4 mr-2" />
                      Optimize TensorRT
                    </Button>
                  </div>
                  <Button onClick={initializeOmniverse} className="w-full bg-purple-600 hover:bg-purple-700">
                    <Globe className="w-4 h-4 mr-2" />
                    Initialize Omniverse
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-400" />
                    Resource Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>GPU Utilization</span>
                      <span>{dgxMetrics.gpuUtilization}%</span>
                    </div>
                    <Progress value={dgxMetrics.gpuUtilization} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Memory Usage</span>
                      <span>{dgxMetrics.memoryUsage}%</span>
                    </div>
                    <Progress value={dgxMetrics.memoryUsage} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-slate-700/50 rounded p-2">
                      <div className="text-gray-400">Network</div>
                      <div className="font-bold">{dgxMetrics.networkThroughput}</div>
                    </div>
                    <div className="bg-slate-700/50 rounded p-2">
                      <div className="text-gray-400">Cost</div>
                      <div className="font-bold">{dgxMetrics.cost}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ngc-catalog" className="space-y-6">
            <Card className="bg-slate-800/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-purple-400" />
                  NGC Catalog Integration
                </CardTitle>
                <CardDescription>
                  NVIDIA GPU Cloud catalog items deployed for HYBRID
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ngcCatalog.map((item, index) => (
                    <div key={index} className="bg-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{item.name}</h3>
                        <Badge className={`${getStatusColor(item.status)} text-white`}>
                          {item.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-400 mb-2">{item.category}</div>
                      <div className="flex justify-between text-xs">
                        <span>FPS: {item.performance.fps}</span>
                        <span>Memory: {item.performance.memory}GB</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="holographic" className="space-y-6">
            <Card className="bg-slate-800/50 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-cyan-400" />
                  Holographic Blockchain Visualization
                </CardTitle>
                <CardDescription>
                  Real-time 3D representation powered by Omniverse
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black/20 rounded-lg">
                  <canvas ref={canvasRef} className="w-full h-96" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hybrid-metrics" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-slate-800/50 border-green-500/30">
                <CardContent className="p-4 text-center">
                  <Coins className="w-6 h-6 mx-auto mb-2 text-green-400" />
                  <div className="text-2xl font-bold text-green-400">{hybridMetrics.coinPrice}</div>
                  <div className="text-sm text-gray-400">HYBRID Price</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-blue-500/30">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                  <div className="text-2xl font-bold text-blue-400">$1T</div>
                  <div className="text-sm text-gray-400">Market Cap</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-purple-500/30">
                <CardContent className="p-4 text-center">
                  <Activity className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                  <div className="text-2xl font-bold text-purple-400">{hybridMetrics.tps}</div>
                  <div className="text-sm text-gray-400">TPS</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-orange-500/30">
                <CardContent className="p-4 text-center">
                  <Users className="w-6 h-6 mx-auto mb-2 text-orange-400" />
                  <div className="text-2xl font-bold text-orange-400">{hybridMetrics.gaslessUsers}</div>
                  <div className="text-sm text-gray-400">Gasless Users</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}