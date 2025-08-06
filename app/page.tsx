'use client'

import { useState, useEffect } from 'react'
import { Play, Download, Upload, Globe, Brain, Activity, FileText, Clock, CheckCircle, XCircle, AlertTriangle, Zap, Map, Cpu, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface FaultData {
  id: string
  latitude: number
  longitude: number
  magnitude: number
  timestamp: string
}

interface WorkflowLog {
  id: string
  timestamp: string
  status: 'completed' | 'running' | 'error'
  component: string
  message: string
}

interface AIInsight {
  id: string
  analysis: string
  riskLevel: 'low' | 'medium' | 'high'
  suggestions: string[]
  timestamp: string
}

export default function FaultMapperDashboard() {
  const [workflowStatus, setWorkflowStatus] = useState<'idle' | 'running' | 'completed' | 'error'>('idle')
  const [faultData, setFaultData] = useState<FaultData[]>([
    { id: '1', latitude: 34.0522, longitude: -118.2437, magnitude: 3.2, timestamp: '2024-01-15 14:30:00' },
    { id: '2', latitude: 37.7749, longitude: -122.4194, magnitude: 2.8, timestamp: '2024-01-15 14:25:00' },
    { id: '3', latitude: 40.7128, longitude: -74.0060, magnitude: 4.1, timestamp: '2024-01-15 14:20:00' }
  ])
  const [lastUpdate, setLastUpdate] = useState('2024-01-15 14:30:00')
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([
    {
      id: '1',
      analysis: 'Detected increased seismic activity in the Pacific Ring of Fire region. Pattern suggests potential aftershock sequence.',
      riskLevel: 'medium',
      suggestions: ['Monitor aftershock patterns', 'Alert nearby monitoring stations', 'Update risk assessment models'],
      timestamp: '2024-01-15 14:35:00'
    }
  ])
  const [workflowLogs, setWorkflowLogs] = useState<WorkflowLog[]>([
    { id: '1', timestamp: '2024-01-15 14:30:00', status: 'completed', component: 'Octave Processing', message: 'Fault detection completed successfully' },
    { id: '2', timestamp: '2024-01-15 14:29:00', status: 'completed', component: 'KML Generation', message: 'KML file generated: faults.kml' },
    { id: '3', timestamp: '2024-01-15 14:28:00', status: 'completed', component: 'n8n Trigger', message: 'Workflow initiated by user' }
  ])

  const runFaultDetection = async () => {
    setWorkflowStatus('running')
    
    // Simulate API call to trigger n8n workflow
    try {
      // In a real implementation, this would call your Flask API
      // await fetch('/api/trigger-workflow', { method: 'POST' })
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      setWorkflowStatus('completed')
      setLastUpdate(new Date().toLocaleString())
      
      // Add new log entry
      const newLog: WorkflowLog = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleString(),
        status: 'completed',
        component: 'Full Workflow',
        message: 'Fault detection workflow completed successfully'
      }
      setWorkflowLogs(prev => [newLog, ...prev])
      
    } catch (error) {
      setWorkflowStatus('error')
    }
  }

  const regenerateInsights = () => {
    const newInsight: AIInsight = {
      id: Date.now().toString(),
      analysis: 'Updated analysis shows correlation between recent fault patterns and historical seismic data. Recommend continued monitoring.',
      riskLevel: 'low',
      suggestions: ['Continue routine monitoring', 'Update geological models', 'Schedule equipment maintenance'],
      timestamp: new Date().toLocaleString()
    }
    setAiInsights(prev => [newInsight, ...prev])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'error': return 'bg-rose-100 text-rose-800 border-rose-200'
      default: return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-rose-100 text-rose-800 border-rose-200'
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'low': return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      default: return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-rose-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-violet-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-violet-400 to-rose-400 rounded-lg flex items-center justify-center">
                <Map className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-rose-600 bg-clip-text text-transparent">
                  Fault Mapper Automation Dashboard
                </h1>
                <p className="text-slate-600 text-sm">Intelligent fault detection and visualization system</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                System Online
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Project Overview */}
        <Card className="mb-8 bg-white/70 backdrop-blur-sm border-violet-100 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-violet-800">
              <Activity className="w-5 h-5" />
              <span>System Architecture</span>
            </CardTitle>
            <CardDescription>
              Modular system for detecting, visualizing, and analyzing fault locations using advanced automation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-4 bg-gradient-to-b from-cyan-50 to-cyan-100 rounded-lg border border-cyan-200">
                <Zap className="w-8 h-8 text-cyan-600 mb-2" />
                <h3 className="font-semibold text-cyan-800">n8n Trigger</h3>
                <p className="text-xs text-cyan-600 text-center">Workflow automation</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-gradient-to-b from-rose-50 to-rose-100 rounded-lg border border-rose-200">
                <Cpu className="w-8 h-8 text-rose-600 mb-2" />
                <h3 className="font-semibold text-rose-800">Octave</h3>
                <p className="text-xs text-rose-600 text-center">Fault computation</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-gradient-to-b from-emerald-50 to-emerald-100 rounded-lg border border-emerald-200">
                <Globe className="w-8 h-8 text-emerald-600 mb-2" />
                <h3 className="font-semibold text-emerald-800">Google Earth</h3>
                <p className="text-xs text-emerald-600 text-center">KML visualization</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-gradient-to-b from-amber-50 to-amber-100 rounded-lg border border-amber-200">
                <Brain className="w-8 h-8 text-amber-600 mb-2" />
                <h3 className="font-semibold text-amber-800">AI Analysis</h3>
                <p className="text-xs text-amber-600 text-center">Pattern recognition</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trigger Panel */}
            <Card className="bg-white/70 backdrop-blur-sm border-violet-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-violet-800">
                  <Play className="w-5 h-5" />
                  <span>Workflow Control</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Button 
                    onClick={runFaultDetection}
                    disabled={workflowStatus === 'running'}
                    className="bg-gradient-to-r from-violet-500 to-rose-500 hover:from-violet-600 hover:to-rose-600 text-white px-8 py-3"
                  >
                    {workflowStatus === 'running' ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Running Detection...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Run Fault Detection
                      </>
                    )}
                  </Button>
                  <Badge className={`px-3 py-1 ${getStatusColor(workflowStatus)}`}>
                    {workflowStatus === 'idle' && 'Ready'}
                    {workflowStatus === 'running' && 'Processing...'}
                    {workflowStatus === 'completed' && 'Completed'}
                    {workflowStatus === 'error' && 'Error'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Fault Data Viewer */}
            <Card className="bg-white/70 backdrop-blur-sm border-violet-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-violet-800">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Fault Data</span>
                  </div>
                  <Badge variant="outline" className="bg-slate-50 text-slate-600">
                    Last updated: {lastUpdate}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <Label htmlFor="fault-upload" className="text-sm font-medium text-slate-700">
                        Upload new fault data (CSV/TXT)
                      </Label>
                      <Input id="fault-upload" type="file" accept=".csv,.txt" className="mt-1" />
                    </div>
                    <Button variant="outline" className="mt-6 border-violet-200 text-violet-700 hover:bg-violet-50">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                  
                  <Separator className="bg-violet-100" />
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-slate-800">Recent Fault Coordinates</h4>
                    <div className="max-h-48 overflow-y-auto space-y-2">
                      {faultData.map((fault) => (
                        <div key={fault.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-violet-50 rounded-lg border border-violet-100">
                          <div className="flex-1">
                            <div className="text-sm font-medium text-slate-800">
                              {fault.latitude.toFixed(4)}°, {fault.longitude.toFixed(4)}°
                            </div>
                            <div className="text-xs text-slate-600">
                              Magnitude: {fault.magnitude} | {fault.timestamp}
                            </div>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={fault.magnitude > 3.5 ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}
                          >
                            M{fault.magnitude}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* KML File Access */}
            <Card className="bg-white/70 backdrop-blur-sm border-violet-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-violet-800">
                  <Globe className="w-5 h-5" />
                  <span>Visualization Access</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                    <Download className="w-4 h-4 mr-2" />
                    Download faults.kml
                  </Button>
                  <Button variant="outline" className="border-cyan-200 text-cyan-700 hover:bg-cyan-50">
                    <Globe className="w-4 h-4 mr-2" />
                    Open Google Earth Web
                  </Button>
                </div>
                <div className="mt-4 p-3 bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-lg border border-cyan-100">
                  <h4 className="font-medium text-slate-800 mb-2">Google Earth Pro Instructions</h4>
                  <ol className="text-sm text-slate-600 space-y-1">
                    <li>1. Download the KML file above</li>
                    <li>2. Open Google Earth Pro</li>
                    <li>3. Go to File → Open and select the KML file</li>
                    <li>4. Fault locations will appear as markers on the map</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* AI Insights Panel */}
            <Card className="bg-white/70 backdrop-blur-sm border-violet-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-violet-800">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-5 h-5" />
                    <span>AI Insights</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={regenerateInsights}
                    className="text-violet-600 hover:bg-violet-50"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.map((insight) => (
                    <div key={insight.id} className="p-4 bg-gradient-to-br from-amber-50 to-rose-50 rounded-lg border border-amber-100">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={`${getRiskColor(insight.riskLevel)} text-xs`}>
                          {insight.riskLevel.toUpperCase()} RISK
                        </Badge>
                        <span className="text-xs text-slate-500">{insight.timestamp}</span>
                      </div>
                      <p className="text-sm text-slate-700 mb-3">{insight.analysis}</p>
                      <div className="space-y-1">
                        <h5 className="text-xs font-medium text-slate-800">Suggestions:</h5>
                        {insight.suggestions.map((suggestion, index) => (
                          <div key={index} className="text-xs text-slate-600 flex items-center space-x-1">
                            <div className="w-1 h-1 bg-violet-400 rounded-full"></div>
                            <span>{suggestion}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Automation Logs */}
            <Card className="bg-white/70 backdrop-blur-sm border-violet-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-violet-800">
                  <Clock className="w-5 h-5" />
                  <span>Workflow Logs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {workflowLogs.map((log) => (
                    <div key={log.id} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-slate-50 to-cyan-50 rounded-lg border border-slate-100">
                      <div className="flex-shrink-0 mt-0.5">
                        {log.status === 'completed' && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                        {log.status === 'running' && <RefreshCw className="w-4 h-4 text-amber-600 animate-spin" />}
                        {log.status === 'error' && <XCircle className="w-4 h-4 text-rose-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-slate-800">{log.component}</p>
                          <span className="text-xs text-slate-500">{log.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{log.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tech Stack Info */}
            <Card className="bg-white/70 backdrop-blur-sm border-violet-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-violet-800">
                  <Cpu className="w-5 h-5" />
                  <span>Tech Stack</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Octave</span>
                    <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">Computation</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">n8n</span>
                    <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">Automation</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Flask API</span>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Backend</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">Google Earth Pro</span>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Visualization</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700">AI Agents</span>
                    <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">Analysis</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
