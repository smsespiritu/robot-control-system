const StatusPanel = ({ robotStatus }) => {
    const { isConnected, battery, isMoving, lastCommand, position } = robotStatus;
    
    const getStatusColor = (status) => {
        if (!isConnected) return 'text-red-600';
        if (isMoving) return 'text-yellow-600';
        return 'text-green-600';
    };
    
    const getStatusText = () => {
        if (!isConnected) return 'Disconnected';
        if (isMoving) return 'Moving';
        return 'Ready';
    };
    
    const getBatteryColor = () => {
        if (battery > 50) return 'text-green-600';
        if (battery > 20) return 'text-yellow-600';
        return 'text-red-600';
    };
    
    const getBatteryIcon = () => {
        if (battery > 75) return 'battery';
        if (battery > 50) return 'battery';
        if (battery > 25) return 'battery';
        return 'battery';
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <i data-feather="activity" className="w-5 h-5 mr-2"></i>
                Robot Status
            </h2>
            
            <div className="space-y-4">
                {/* Connection Status */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Connection</span>
                    <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${
                            isConnected ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <span className={`text-sm font-medium ${getStatusColor()}`}>
                            {getStatusText()}
                        </span>
                    </div>
                </div>
                
                {/* Battery Level */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Battery</span>
                    <div className="flex items-center">
                        <i data-feather={getBatteryIcon()} className={`w-4 h-4 mr-2 ${getBatteryColor()}`}></i>
                        <span className={`text-sm font-medium ${getBatteryColor()}`}>
                            {battery}%
                        </span>
                    </div>
                </div>
                
                {/* Position */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Position</span>
                    <span className="text-sm text-gray-600">
                        ({position.x.toFixed(1)}, {position.y.toFixed(1)})
                    </span>
                </div>
                
                {/* Orientation */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Orientation</span>
                    <span className="text-sm text-gray-600">
                        {position.rotation.toFixed(1)}°
                    </span>
                </div>
                
                {/* Last Command */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Last Command</span>
                    <span className="text-sm text-gray-600">
                        {lastCommand ? lastCommand.toUpperCase() : 'None'}
                    </span>
                </div>
                
                {/* Movement Status */}
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Movement</span>
                    <div className="flex items-center">
                        {isMoving ? (
                            <>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
                                <span className="text-sm font-medium text-yellow-600">Active</span>
                            </>
                        ) : (
                            <>
                                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                <span className="text-sm font-medium text-green-600">Idle</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Status Summary */}
            <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Overall Status</span>
                    <div className="flex items-center">
                        <i data-feather={isConnected ? "check-circle" : "x-circle"} 
                           className={`w-4 h-4 mr-2 ${isConnected ? 'text-green-500' : 'text-red-500'}`}></i>
                        <span className={`text-sm font-medium ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                            {isConnected ? 'Operational' : 'Offline'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
