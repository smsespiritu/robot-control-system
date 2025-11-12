const { useState, useEffect } = React;

const App = () => {
    const [robotStatus, setRobotStatus] = useState({
        isConnected: false,
        position: { x: 0, y: 0, rotation: 0 },
        isMoving: false,
        battery: 100,
        lastCommand: null,
        error: null
    });

    const [connectionStatus, setConnectionStatus] = useState('disconnected');

    useEffect(() => {
        // Initialize connection to robot
        connectToRobot();
        
        // Set up status polling
        const statusInterval = setInterval(fetchRobotStatus, 1000);
        
        return () => clearInterval(statusInterval);
    }, []);

    const connectToRobot = async () => {
        try {
            setConnectionStatus('connecting');
            const response = await RobotAPI.connect();
            
            if (response.success) {
                setRobotStatus(prev => ({
                    ...prev,
                    isConnected: true,
                    error: null
                }));
                setConnectionStatus('connected');
            } else {
                throw new Error(response.message || 'Connection failed');
            }
        } catch (error) {
            console.error('Connection error:', error);
            setRobotStatus(prev => ({
                ...prev,
                isConnected: false,
                error: error.message
            }));
            setConnectionStatus('error');
        }
    };

    const fetchRobotStatus = async () => {
        try {
            const status = await RobotAPI.getStatus();
            setRobotStatus(prev => ({
                ...prev,
                ...status,
                error: null
            }));
        } catch (error) {
            console.error('Status fetch error:', error);
            setRobotStatus(prev => ({
                ...prev,
                error: error.message
            }));
        }
    };

    const handleCommand = async (command, params = {}) => {
        try {
            setRobotStatus(prev => ({
                ...prev,
                isMoving: true,
                lastCommand: command,
                error: null
            }));

            const response = await RobotAPI.sendCommand(command, params);
            
            if (!response.success) {
                throw new Error(response.message || 'Command failed');
            }
            
            // Update status after command
            setTimeout(fetchRobotStatus, 100);
            
        } catch (error) {
            console.error('Command error:', error);
            setRobotStatus(prev => ({
                ...prev,
                isMoving: false,
                error: error.message
            }));
        }
    };

    const handleEmergencyStop = async () => {
        try {
            await RobotAPI.emergencyStop();
            setRobotStatus(prev => ({
                ...prev,
                isMoving: false,
                lastCommand: 'EMERGENCY_STOP'
            }));
        } catch (error) {
            console.error('Emergency stop error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <i data-feather="cpu" className="w-8 h-8 text-blue-600 mr-3"></i>
                            <h1 className="text-2xl font-bold text-gray-900">Robot Control Interface</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                connectionStatus === 'connected' ? 'bg-green-100 text-green-800' :
                                connectionStatus === 'connecting' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                                {connectionStatus === 'connected' ? 'Connected' :
                                 connectionStatus === 'connecting' ? 'Connecting...' :
                                 'Disconnected'}
                            </div>
                            <button
                                onClick={connectToRobot}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={connectionStatus === 'connecting'}
                            >
                                {connectionStatus === 'connecting' ? 'Connecting...' : 'Reconnect'}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Robot Visualization */}
                    <div className="lg:col-span-2">
                        <RobotVisualization robotStatus={robotStatus} />
                    </div>
                    
                    {/* Control Panel */}
                    <div className="space-y-6">
                        <StatusPanel robotStatus={robotStatus} />
                        <RobotControl 
                            onCommand={handleCommand}
                            onEmergencyStop={handleEmergencyStop}
                            isConnected={robotStatus.isConnected}
                            isMoving={robotStatus.isMoving}
                        />
                    </div>
                </div>
                
                {/* Error Display */}
                {robotStatus.error && (
                    <div className="mt-6 bg-red-50 border border-red-200 rounded-md p-4">
                        <div className="flex">
                            <i data-feather="alert-circle" className="w-5 h-5 text-red-400 mr-2"></i>
                            <div>
                                <h3 className="text-sm font-medium text-red-800">Error</h3>
                                <p className="text-sm text-red-700 mt-1">{robotStatus.error}</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
