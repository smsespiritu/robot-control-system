const RobotVisualization = ({ robotStatus }) => {
    const { position, isMoving, lastCommand } = robotStatus;
    
    // Convert position to visualization coordinates
    const visualX = 200 + (position.x * 2); // Center at 200px
    const visualY = 200 + (position.y * 2); // Center at 200px
    
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <i data-feather="monitor" className="w-5 h-5 mr-2"></i>
                Robot Visualization
            </h2>
            
            {/* Main Visualization Area */}
            <div className="relative bg-gray-50 rounded-lg p-4 mb-4" style={{ height: '400px' }}>
                {/* Grid Background */}
                <svg className="absolute inset-0 w-full h-full">
                    <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    
                    {/* Center reference lines */}
                    <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#d1d5db" strokeWidth="2" strokeDasharray="5,5"/>
                    <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#d1d5db" strokeWidth="2" strokeDasharray="5,5"/>
                </svg>
                
                {/* Robot Representation */}
                <div 
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                        isMoving ? 'scale-110' : 'scale-100'
                    }`}
                    style={{
                        left: `${Math.max(25, Math.min(375, visualX))}px`,
                        top: `${Math.max(25, Math.min(375, visualY))}px`,
                        transform: `translate(-50%, -50%) rotate(${position.rotation}deg) ${isMoving ? 'scale(1.1)' : 'scale(1)'}`
                    }}
                >
                    {/* Robot Body */}
                    <div className={`w-12 h-16 rounded-lg border-4 ${
                        robotStatus.isConnected 
                            ? isMoving 
                                ? 'bg-blue-400 border-blue-600' 
                                : 'bg-blue-300 border-blue-500'
                            : 'bg-gray-300 border-gray-500'
                    } relative shadow-lg`}>
                        {/* Robot Face/Direction Indicator */}
                        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-white rounded"></div>
                        
                        {/* Movement indicator */}
                        {isMoving && (
                            <div className="absolute -top-2 -left-2 w-16 h-20 border-2 border-yellow-400 rounded-lg animate-pulse"></div>
                        )}
                    </div>
                </div>
                
                {/* Position Coordinates Display */}
                <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white px-3 py-2 rounded text-sm">
                    X: {position.x.toFixed(1)}, Y: {position.y.toFixed(1)}, R: {position.rotation.toFixed(1)}°
                </div>
                
                {/* Movement Trail */}
                {lastCommand && (
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-3 py-2 rounded text-sm">
                        Last: {lastCommand.toUpperCase()}
                    </div>
                )}
            </div>
            
            {/* Legend */}
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-300 border-2 border-blue-500 rounded mr-2"></div>
                    <span>Robot (Connected)</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-blue-400 border-2 border-blue-600 rounded mr-2"></div>
                    <span>Robot (Moving)</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-300 border-2 border-gray-500 rounded mr-2"></div>
                    <span>Robot (Disconnected)</span>
                </div>
                <div className="flex items-center">
                    <div className="w-4 h-1 bg-gray-400 mr-2"></div>
                    <span>Grid (20px)</span>
                </div>
            </div>
        </div>
    );
};
