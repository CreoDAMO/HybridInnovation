
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Satellite, Radio, MapPin, Shield, Waves } from 'lucide-react';

interface SatelliteConnection {
  constellation: string;
  signal: number;
  latency: number;
  coverage: string;
  encryption: boolean;
}

interface IoTDevice {
  id: string;
  type: string;
  location: string;
  status: 'online' | 'offline' | 'transmitting';
  batteryLevel: number;
  lastUpdate: Date;
}

export function SatelliteIoTInterface() {
  const [connections, setConnections] = useState<SatelliteConnection[]>([
    {
      constellation: 'HybridSat Network',
      signal: 87,
      latency: 25,
      coverage: 'Miami-Dade County',
      encryption: true
    },
    {
      constellation: 'EdgeSat-2025',
      signal: 92,
      latency: 18,
      coverage: 'South Florida',
      encryption: true
    }
  ]);

  const [devices, setDevices] = useState<IoTDevice[]>([
    {
      id: 'MIA-PORT-001',
      type: 'Maritime Sensor',
      location: 'Port of Miami',
      status: 'online',
      batteryLevel: 95,
      lastUpdate: new Date()
    },
    {
      id: 'MIA-AGRI-002',
      type: 'Agricultural Monitor',
      location: 'Homestead Farms',
      status: 'transmitting',
      batteryLevel: 82,
      lastUpdate: new Date()
    },
    {
      id: 'MIA-EMRG-003',
      type: 'Emergency Beacon',
      location: 'Hurricane Zone Alpha',
      status: 'online',
      batteryLevel: 78,
      lastUpdate: new Date()
    }
  ]);

  const [isConnecting, setIsConnecting] = useState(false);
  const [miamiDadeStatus, setMiamiDadeStatus] = useState('Connected');

  useEffect(() => {
    // Simulate real-time satellite updates
    const interval = setInterval(() => {
      setConnections(prev => prev.map(conn => ({
        ...conn,
        signal: Math.max(70, Math.min(100, conn.signal + (Math.random() - 0.5) * 10)),
        latency: Math.max(10, conn.latency + (Math.random() - 0.5) * 5)
      })));

      setDevices(prev => prev.map(device => ({
        ...device,
        batteryLevel: Math.max(0, device.batteryLevel - Math.random() * 0.5),
        lastUpdate: new Date()
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const connectToHybridSat = async () => {
    setIsConnecting(true);
    setMiamiDadeStatus('Connecting to HybridSat...');

    await new Promise(resolve => setTimeout(resolve, 2000));

    setMiamiDadeStatus('Connected - Miami-Dade IoT Network Active');
    setIsConnecting(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400';
      case 'transmitting': return 'text-blue-400';
      case 'offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return '🟢';
      case 'transmitting': return '📡';
      case 'offline': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <Card className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border-blue-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Satellite className="w-6 h-6 text-blue-400" />
          Satellite IoT Network - Miami-Dade County
          <Badge variant="outline" className="text-blue-400 border-blue-400">
            Licensed Business
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Satellite Connections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="text-blue-400 font-semibold flex items-center gap-2">
              <Radio className="w-4 h-4" />
              Satellite Connections
            </h4>
            
            {connections.map((conn, index) => (
              <div
                key={index}
                className="bg-black/30 p-3 rounded border border-blue-500/30"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">{conn.constellation}</span>
                  <div className="flex items-center gap-2">
                    {conn.encryption && <Shield className="w-4 h-4 text-green-400" />}
                    <Badge variant="secondary">{conn.signal}%</Badge>
                  </div>
                </div>
                
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Coverage:</span>
                    <span className="text-white">{conn.coverage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Latency:</span>
                    <span className="text-white">{conn.latency.toFixed(1)}ms</span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                    style={{ width: `${conn.signal}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h4 className="text-cyan-400 font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              IoT Device Network
            </h4>
            
            {devices.map((device) => (
              <div
                key={device.id}
                className="bg-black/30 p-3 rounded border border-cyan-500/30"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">{device.id}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{getStatusIcon(device.status)}</span>
                    <Badge 
                      variant="outline" 
                      className={`${getStatusColor(device.status)} border-current`}
                    >
                      {device.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Type:</span>
                    <span className="text-white">{device.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Location:</span>
                    <span className="text-white">{device.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Battery:</span>
                    <span className="text-white">{device.batteryLevel.toFixed(1)}%</span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full ${
                      device.batteryLevel > 50 
                        ? 'bg-gradient-to-r from-green-500 to-green-400'
                        : device.batteryLevel > 20
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-400'
                        : 'bg-gradient-to-r from-red-500 to-red-400'
                    }`}
                    style={{ width: `${device.batteryLevel}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Applications */}
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded border border-green-500/30">
          <h5 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
            <Waves className="w-4 h-4" />
            Miami-Dade Business Applications
          </h5>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="text-white font-medium">Maritime Commerce</div>
              <ul className="text-gray-300 space-y-1 text-xs">
                <li>• Port of Miami cargo tracking</li>
                <li>• Vessel communication systems</li>
                <li>• Maritime safety monitoring</li>
                <li>• Supply chain visibility</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <div className="text-white font-medium">Agricultural IoT</div>
              <ul className="text-gray-300 space-y-1 text-xs">
                <li>• Homestead farm monitoring</li>
                <li>• Crop yield optimization</li>
                <li>• Water management systems</li>
                <li>• Weather station networks</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <div className="text-white font-medium">Emergency Services</div>
              <ul className="text-gray-300 space-y-1 text-xs">
                <li>• Hurricane preparedness</li>
                <li>• Emergency communication</li>
                <li>• Disaster response coordination</li>
                <li>• Public safety networks</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <div className="text-white font-medium">Smart City Infrastructure</div>
              <ul className="text-gray-300 space-y-1 text-xs">
                <li>• Traffic management</li>
                <li>• Environmental monitoring</li>
                <li>• Energy grid optimization</li>
                <li>• 5G/satellite hybrid networks</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="flex gap-3 pt-4 border-t border-blue-500/20">
          <Button
            onClick={connectToHybridSat}
            disabled={isConnecting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isConnecting ? (
              <>
                <Satellite className="w-4 h-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Satellite className="w-4 h-4 mr-2" />
                Connect HybridSat
              </>
            )}
          </Button>

          <Button
            variant="outline"
            className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Miami-Dade Services
          </Button>
        </div>

        {/* Status Display */}
        <div className="bg-black/50 p-3 rounded border border-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">Network Status:</span>
            <span className="text-sm text-white">{miamiDadeStatus}</span>
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Licensed for Sales Tax ID & Communication Services Tax ID operations
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
