using RobotControlApp.Models;
using RobotControlApp.Services;

namespace RobotControlApp
{
    class Program
    {
        private static RobotApiClient? _robotClient;
        private static bool _isConnected = false;
        private static Timer? _statusTimer;

        static async Task Main(string[] args)
        {
            Console.WriteLine("=== C# Robot Control Application ===");
            Console.WriteLine("Connecting to Robot Control Server...\n");

            _robotClient = new RobotApiClient();
            
            // Try to connect to the robot
            await ConnectToRobot();
            
            // Start status monitoring
            StartStatusMonitoring();
            
            // Show the main menu
            await ShowMainMenu();
            
            // Cleanup
            _statusTimer?.Dispose();
            _robotClient?.Dispose();
        }

        static async Task ConnectToRobot()
        {
            Console.Write("Attempting to connect to robot... ");
            
            var connectResult = await _robotClient!.ConnectAsync();
            
            if (connectResult.Success)
            {
                _isConnected = true;
                Console.WriteLine("✓ Connected successfully!");
                Console.WriteLine($"Message: {connectResult.Message}\n");
            }
            else
            {
                Console.WriteLine("✗ Connection failed!");
                Console.WriteLine($"Error: {connectResult.Message}\n");
            }
        }

        static void StartStatusMonitoring()
        {
            _statusTimer = new Timer(async _ => await UpdateStatus(), null, TimeSpan.Zero, TimeSpan.FromSeconds(2));
        }

        static async Task UpdateStatus()
        {
            if (!_isConnected) return;
            
            var status = await _robotClient!.GetStatusAsync();
            if (status != null)
            {
                // Clear the current status line and update it
                Console.SetCursorPosition(0, Console.WindowHeight - 3);
                Console.Write(new string(' ', Console.WindowWidth));
                Console.SetCursorPosition(0, Console.WindowHeight - 3);
                
                string statusText = $"Status: {(status.IsConnected ? "Connected" : "Disconnected")} | " +
                                  $"Position: ({status.Position.X:F1}, {status.Position.Y:F1}) | " +
                                  $"Rotation: {status.Position.Rotation:F1}° | " +
                                  $"Battery: {status.Battery:F1}% | " +
                                  $"Moving: {(status.IsMoving ? "Yes" : "No")}";
                
                Console.Write(statusText);
                
                // Return cursor to input area
                Console.SetCursorPosition(0, Console.WindowHeight - 1);
            }
        }

        static async Task ShowMainMenu()
        {
            Console.WriteLine("Robot Control Commands:");
            Console.WriteLine("1. Move Forward    2. Move Backward   3. Move Left       4. Move Right");
            Console.WriteLine("5. Rotate Left     6. Rotate Right    7. Stop            8. Emergency Stop");
            Console.WriteLine("9. Reset Position  0. Disconnect      q. Quit");
            Console.WriteLine("Enter speed (1-100) before movement commands (default: 50)");
            Console.WriteLine(new string('-', 70));
            Console.WriteLine();

            int currentSpeed = 50;
            
            while (true)
            {
                Console.SetCursorPosition(0, Console.WindowHeight - 1);
                Console.Write($"Command (Speed: {currentSpeed}): ");
                
                var input = Console.ReadLine()?.Trim().ToLower();
                
                if (string.IsNullOrEmpty(input)) continue;
                
                // Clear the input line
                Console.SetCursorPosition(0, Console.WindowHeight - 1);
                Console.Write(new string(' ', Console.WindowWidth));
                
                if (input == "q" || input == "quit")
                {
                    if (_isConnected)
                    {
                        await _robotClient!.DisconnectAsync();
                    }
                    break;
                }
                
                // Check if input is a speed setting
                if (int.TryParse(input, out int speed) && speed >= 1 && speed <= 100)
                {
                    currentSpeed = speed;
                    Console.SetCursorPosition(0, Console.WindowHeight - 2);
                    Console.Write(new string(' ', Console.WindowWidth));
                    Console.SetCursorPosition(0, Console.WindowHeight - 2);
                    Console.Write($"Speed set to: {currentSpeed}%");
                    continue;
                }
                
                if (!_isConnected)
                {
                    Console.SetCursorPosition(0, Console.WindowHeight - 2);
                    Console.Write("Error: Robot not connected!");
                    continue;
                }
                
                await ProcessCommand(input, currentSpeed);
            }
        }

        static async Task ProcessCommand(string command, int speed)
        {
            ApiResponse<object>? result = null;
            
            switch (command)
            {
                case "1":
                    result = await _robotClient!.SendCommandAsync("move", new MovementParams 
                    { 
                        Direction = "forward", 
                        Speed = speed, 
                        Duration = 1000 
                    });
                    break;
                    
                case "2":
                    result = await _robotClient!.SendCommandAsync("move", new MovementParams 
                    { 
                        Direction = "backward", 
                        Speed = speed, 
                        Duration = 1000 
                    });
                    break;
                    
                case "3":
                    result = await _robotClient!.SendCommandAsync("move", new MovementParams 
                    { 
                        Direction = "left", 
                        Speed = speed, 
                        Duration = 1000 
                    });
                    break;
                    
                case "4":
                    result = await _robotClient!.SendCommandAsync("move", new MovementParams 
                    { 
                        Direction = "right", 
                        Speed = speed, 
                        Duration = 1000 
                    });
                    break;
                    
                case "5":
                    result = await _robotClient!.SendCommandAsync("rotate", new RotationParams 
                    { 
                        Direction = "left", 
                        Speed = speed, 
                        Duration = 500 
                    });
                    break;
                    
                case "6":
                    result = await _robotClient!.SendCommandAsync("rotate", new RotationParams 
                    { 
                        Direction = "right", 
                        Speed = speed, 
                        Duration = 500 
                    });
                    break;
                    
                case "7":
                    result = await _robotClient!.SendCommandAsync("stop");
                    break;
                    
                case "8":
                    result = await _robotClient!.EmergencyStopAsync();
                    break;
                    
                case "9":
                    result = await _robotClient!.ResetPositionAsync();
                    break;
                    
                case "0":
                    result = await _robotClient!.DisconnectAsync();
                    if (result.Success)
                    {
                        _isConnected = false;
                    }
                    break;
                    
                default:
                    Console.SetCursorPosition(0, Console.WindowHeight - 2);
                    Console.Write("Invalid command! Use 1-9, 0, or q");
                    return;
            }
            
            // Display result
            Console.SetCursorPosition(0, Console.WindowHeight - 2);
            Console.Write(new string(' ', Console.WindowWidth));
            Console.SetCursorPosition(0, Console.WindowHeight - 2);
            
            if (result != null)
            {
                if (result.Success)
                {
                    Console.Write($"✓ {result.Message}");
                }
                else
                {
                    Console.Write($"✗ {result.Message}");
                }
            }
        }
    }
}