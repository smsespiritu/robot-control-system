const RobotControl = ({ onCommand, onEmergencyStop, isConnected, isMoving }) => {
    const [moveSpeed, setMoveSpeed] = useState(50);
    const [rotationSpeed, setRotationSpeed] = useState(30);

    const handleMovementCommand = (direction) => {
        if (!isConnected) return;
        
        onCommand('move', {
            direction: direction,
            speed: moveSpeed,
            duration: 1000 // 1 second movement
        });
    };

    const handleRotationCommand = (direction) => {
        if (!isConnected) return;
        
        onCommand('rotate', {
            direction: direction,
            speed: rotationSpeed,
            duration: 500 // 0.5 second rotation
        });
    };

    const handleStop = () => {
        onCommand('stop');
    };

    const buttonClass = (disabled = false) => `
        p-4 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
        ${disabled 
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg'
        }
    `;

    const isDisabled = !isConnected || isMoving;

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <i data-feather="gamepad-2" className="w-5 h-5 mr-2"></i>
                Robot Controls
            </h2>

            {/* Speed Controls */}
            <div className="mb-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Movement Speed: {moveSpeed}%
                    </label>
                    <input
                        type="range"
                        min="10"
                        max="100"
                        value={moveSpeed}
                        onChange={(e) => setMoveSpeed(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        disabled={isDisabled}
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rotation Speed: {rotationSpeed}%
                    </label>
                    <input
                        type="range"
                        min="10"
                        max="100"
                        value={rotationSpeed}
                        onChange={(e) => setRotationSpeed(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        disabled={isDisabled}
                    />
                </div>
            </div>

            {/* Movement Controls */}
            <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Movement</h3>
                <div className="grid grid-cols-3 gap-2">
                    <div></div>
                    <button
                        onClick={() => handleMovementCommand('forward')}
                        disabled={isDisabled}
                        className={buttonClass(isDisabled)}
                        title="Move Forward"
                    >
                        <i data-feather="arrow-up" className="w-5 h-5 mx-auto"></i>
                    </button>
                    <div></div>
                    
                    <button
                        onClick={() => handleMovementCommand('left')}
                        disabled={isDisabled}
                        className={buttonClass(isDisabled)}
                        title="Move Left"
                    >
                        <i data-feather="arrow-left" className="w-5 h-5 mx-auto"></i>
                    </button>
                    <button
                        onClick={handleStop}
                        disabled={!isConnected}
                        className="p-4 rounded-lg font-medium bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        title="Stop"
                    >
                        <i data-feather="square" className="w-5 h-5 mx-auto"></i>
                    </button>
                    <button
                        onClick={() => handleMovementCommand('right')}
                        disabled={isDisabled}
                        className={buttonClass(isDisabled)}
                        title="Move Right"
                    >
                        <i data-feather="arrow-right" className="w-5 h-5 mx-auto"></i>
                    </button>
                    
                    <div></div>
                    <button
                        onClick={() => handleMovementCommand('backward')}
                        disabled={isDisabled}
                        className={buttonClass(isDisabled)}
                        title="Move Backward"
                    >
                        <i data-feather="arrow-down" className="w-5 h-5 mx-auto"></i>
                    </button>
                    <div></div>
                </div>
            </div>

            {/* Rotation Controls */}
            <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Rotation</h3>
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleRotationCommand('left')}
                        disabled={isDisabled}
                        className={`flex-1 ${buttonClass(isDisabled)}`}
                        title="Rotate Left"
                    >
                        <i data-feather="rotate-ccw" className="w-5 h-5 mx-auto"></i>
                    </button>
                    <button
                        onClick={() => handleRotationCommand('right')}
                        disabled={isDisabled}
                        className={`flex-1 ${buttonClass(isDisabled)}`}
                        title="Rotate Right"
                    >
                        <i data-feather="rotate-cw" className="w-5 h-5 mx-auto"></i>
                    </button>
                </div>
            </div>

            {/* Emergency Stop */}
            <div className="border-t pt-4">
                <button
                    onClick={onEmergencyStop}
                    disabled={!isConnected}
                    className="w-full p-4 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-200 disabled:text-gray-400"
                >
                    <i data-feather="alert-octagon" className="w-5 h-5 inline mr-2"></i>
                    EMERGENCY STOP
                </button>
            </div>
        </div>
    );
};
