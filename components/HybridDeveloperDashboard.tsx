
import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Icons (using simple emoji/text for now)
const icons = {
  play: '▶️',
  pause: '⏸️',
  stop: '⏹️',
  settings: '⚙️',
  cloud: '☁️',
  cpu: '💾',
  zap: '⚡',
  gamepad: '🎮',
  eye: '👁️',
  layers: '📚',
  code: '💻',
  database: '🗄️',
  users: '👥',
  trending: '📈',
  activity: '📊',
  globe: '🌍',
  shield: '🛡️',
  coins: '🪙',
  hexagon: '⬡'
};

interface ProjectData {
  engine: string;
  project: string;
  status: string;
  performance: {
    fps: number;
    memory: number;
  };
}

interface MetricData {
  title: string;
  value: number;
  unit: string;
  color: string;
  trend: number;
}

interface ChartData {
  name: string;
  unity: number;
  unreal: number;
  nvidia: number;
}

const HybridDeveloperDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isRendering, setIsRendering] = useState(false);
  const [cloudConnected, setCloudConnected] = useState(true);
  const [nvidiaStatus, setNvidiaStatus] = useState('active');
  const [theme, setTheme] = useState('dark');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Real-time system metrics
  const [systemMetrics, setSystemMetrics] = useState({
    gpu: 78,
    cpu: 65,
    ram: 82,
    vram: 91,
    temperature: 72,
    power: 85
  });

  // Mock data for charts
  const renderingData: ChartData[] = [
    { name: 'Frame 1', unity: 60, unreal: 45, nvidia: 120 },
    { name: 'Frame 2', unity: 58, unreal: 48, nvidia: 118 },
    { name: 'Frame 3', unity: 62, unreal: 44, nvidia: 125 },
    { name: 'Frame 4', unity: 55, unreal: 50, nvidia: 115 },
    { name: 'Frame 5', unity: 59, unreal: 46, nvidia: 122 },
    { name: 'Frame 6', unity: 61, unreal: 49, nvidia: 128 }
  ];

  const nftData = [
    { name: 'Game Assets', value: 45, color: '#667eea' },
    { name: 'Characters', value: 30, color: '#f093fb' },
    { name: 'Environments', value: 25, color: '#4facfe' }
  ];

  const projects: ProjectData[] = [
    {
      engine: 'Unity 3D',
      project: 'MetaverseGame',
      status: 'active',
      performance: { fps: 60, memory: 2.4 }
    },
    {
      engine: 'Unreal Engine 5',
      project: 'VRExperience',
      status: 'building',
      performance: { fps: 45, memory: 3.8 }
    }
  ];

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        gpu: Math.max(20, Math.min(100, prev.gpu + (Math.random() - 0.5) * 10)),
        cpu: Math.max(10, Math.min(100, prev.cpu + (Math.random() - 0.5) * 8)),
        ram: Math.max(30, Math.min(100, prev.ram + (Math.random() - 0.5) * 6)),
        vram: Math.max(40, Math.min(100, prev.vram + (Math.random() - 0.5) * 12)),
        temperature: Math.max(45, Math.min(85, prev.temperature + (Math.random() - 0.5) * 4)),
        power: Math.max(50, Math.min(100, prev.power + (Math.random() - 0.5) * 5))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Simple WebGL holographic effect
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Basic holographic shader effect
    const animate = () => {
      gl.clearColor(0.1, 0.1, 0.2, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      // Simple gradient effect to simulate holographic display
      const time = Date.now() * 0.001;
      const r = Math.sin(time) * 0.5 + 0.5;
      const g = Math.sin(time + 2) * 0.5 + 0.5;
      const b = Math.sin(time + 4) * 0.5 + 0.5;
      
      gl.clearColor(r * 0.2, g * 0.3, b * 0.5, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }, []);

  const MetricCard: React.FC<{
    title: string;
    value: number;
    unit: string;
    icon: string;
    color: string;
    trend: number;
  }> = ({ title, value, unit, icon, color, trend }) => (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl">{icon}</span>
          <div className={`text-sm ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
          </div>
        </div>
        <div className="text-2xl font-bold text-white mb-1">{value}{unit}</div>
        <div className="text-sm text-gray-400">{title}</div>
      </CardContent>
    </Card>
  );

  const ProjectCard: React.FC<{
    project: ProjectData;
  }> = ({ project }) => (
    <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{icons.layers}</span>
            <div>
              <CardTitle className="text-white">{project.engine}</CardTitle>
              <CardDescription className="text-gray-400">{project.project}</CardDescription>
            </div>
          </div>
          <Badge 
            variant={project.status === 'active' ? 'default' : 'secondary'}
            className={project.status === 'active' ? 'bg-green-600' : 'bg-yellow-600'}
          >
            {project.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-2xl font-bold text-white">{project.performance.fps} FPS</div>
            <div className="text-sm text-gray-400">Performance</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{project.performance.memory}GB</div>
            <div className="text-sm text-gray-400">Memory</div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-500">
            Launch
          </Button>
          <Button variant="outline" size="icon">
            {icons.settings}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="GPU Usage"
          value={systemMetrics.gpu}
          unit="%"
          icon={icons.cpu}
          color="text-blue-400"
          trend={2.3}
        />
        <MetricCard
          title="CPU Usage"
          value={systemMetrics.cpu}
          unit="%"
          icon={icons.activity}
          color="text-green-400"
          trend={-1.2}
        />
        <MetricCard
          title="VRAM Usage"
          value={systemMetrics.vram}
          unit="%"
          icon={icons.eye}
          color="text-orange-400"
          trend={-0.8}
        />
      </div>

      {/* Engine Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>

      {/* Performance Chart */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Real-time Rendering Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={renderingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Line type="monotone" dataKey="unity" stroke="#667eea" strokeWidth={2} name="Unity" />
              <Line type="monotone" dataKey="unreal" stroke="#f093fb" strokeWidth={2} name="Unreal" />
              <Line type="monotone" dataKey="nvidia" stroke="#4facfe" strokeWidth={2} name="Nvidia Cloud" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderNvidiaCloud = () => (
    <div className="space-y-6">
      {/* Cloud Status */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{icons.cloud}</span>
              <div>
                <CardTitle className="text-white">Nvidia Cloud Services</CardTitle>
                <CardDescription>GeForce NOW + Omniverse Integration</CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">Connected</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Render Time</div>
              <div className="text-2xl font-bold text-white mb-2">850ms</div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Bandwidth</div>
              <div className="text-2xl font-bold text-white mb-2">750 Mbps</div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Latency</div>
              <div className="text-2xl font-bold text-white mb-2">12ms</div>
              <Progress value={24} className="h-2" />
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Quality</div>
              <div className="text-2xl font-bold text-white mb-2">92%</div>
              <Progress value={92} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Holographic Display */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <span>{icons.eye}</span>
            <span>Holographic Display (Research Preview)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <canvas 
                ref={canvasRef}
                width={400}
                height={300}
                className="w-full border border-gray-600 rounded-lg"
              />
              <p className="text-sm text-gray-400 mt-2">
                WebGL-based holographic rendering simulation
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Display Technology</h4>
                <div className="text-sm text-gray-400 space-y-1">
                  <p>• Ultra-thin (2.5mm) VR glasses</p>
                  <p>• 3D holographic image support</p>
                  <p>• Real-time ray tracing integration</p>
                  <p>• AI-mediated reality features</p>
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-medium text-white mb-3">Rendering Pipeline</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Light Field Generation</span>
                    <span className="text-sm text-green-400">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Spatial Mapping</span>
                    <span className="text-sm text-blue-400">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBlockchainNFT = () => (
    <div className="space-y-6">
      {/* NFT Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">NFT Asset Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={nftData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {nftData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Blockchain Networks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Ethereum Network</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 text-sm">Connected</span>
                </div>
              </div>
              <div className="text-sm text-gray-400">Gas Price: 23 gwei</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Polygon Network</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 text-sm">Connected</span>
                </div>
              </div>
              <div className="text-sm text-gray-400">Fee: 0.001 MATIC</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Marketplace Stats */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">NFT Marketplace Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <span className="text-3xl">{icons.hexagon}</span>
              <div className="text-2xl font-bold text-white">1,247</div>
              <div className="text-sm text-gray-400">Total NFTs</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <span className="text-3xl">{icons.coins}</span>
              <div className="text-2xl font-bold text-white">43.2 ETH</div>
              <div className="text-sm text-gray-400">Total Volume</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <span className="text-3xl">{icons.trending}</span>
              <div className="text-2xl font-bold text-white">892</div>
              <div className="text-sm text-gray-400">Active Traders</div>
            </div>
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <span className="text-3xl">{icons.shield}</span>
              <div className="text-2xl font-bold text-white">99.7%</div>
              <div className="text-sm text-gray-400">Verification Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Performance Analytics */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Performance Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={renderingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Area type="monotone" dataKey="nvidia" stackId="1" stroke="#4facfe" fill="#4facfe" fillOpacity={0.6} />
              <Area type="monotone" dataKey="unreal" stackId="1" stroke="#f093fb" fill="#f093fb" fillOpacity={0.6} />
              <Area type="monotone" dataKey="unity" stackId="1" stroke="#667eea" fill="#667eea" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Resource Usage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Resource Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">GPU Memory</span>
                <span className="text-sm text-white">{systemMetrics.vram}%</span>
              </div>
              <Progress value={systemMetrics.vram} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">System RAM</span>
                <span className="text-sm text-white">{systemMetrics.ram}%</span>
              </div>
              <Progress value={systemMetrics.ram} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">CPU Usage</span>
                <span className="text-sm text-white">{systemMetrics.cpu}%</span>
              </div>
              <Progress value={systemMetrics.cpu} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Development Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Build Time</span>
              <span className="text-white font-medium">2m 34s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Assets Compiled</span>
              <span className="text-white font-medium">1,247</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Shaders Compiled</span>
              <span className="text-white font-medium">89</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Warnings</span>
              <span className="text-yellow-400 font-medium">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Errors</span>
              <span className="text-red-400 font-medium">0</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
            <div>
              <h1 className="text-2xl font-bold">Hybrid Developer Dashboard</h1>
              <p className="text-gray-400">Unity + Unreal + Nvidia Cloud Integration</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </Button>
            <Button
              onClick={() => setIsRendering(!isRendering)}
              className={isRendering ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'}
            >
              {isRendering ? icons.pause : icons.play} {isRendering ? 'Pause' : 'Start'} Rendering
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
              {icons.activity} Overview
            </TabsTrigger>
            <TabsTrigger value="nvidia" className="data-[state=active]:bg-blue-600">
              {icons.cloud} Nvidia Cloud
            </TabsTrigger>
            <TabsTrigger value="blockchain" className="data-[state=active]:bg-blue-600">
              {icons.coins} Blockchain/NFT
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600">
              {icons.trending} Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            {renderOverview()}
          </TabsContent>

          <TabsContent value="nvidia" className="mt-6">
            {renderNvidiaCloud()}
          </TabsContent>

          <TabsContent value="blockchain" className="mt-6">
            {renderBlockchainNFT()}
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            {renderAnalytics()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HybridDeveloperDashboard;
