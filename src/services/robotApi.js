const RobotAPI = {
    baseURL: 'http://localhost:8000/api/robot',
    
    // Helper method for making API calls
    async makeRequest(endpoint, options = {}) {
        try {
            const response = await axios({
                url: `${this.baseURL}${endpoint}`,
                timeout: 5000,
                ...options
            });
            return response.data;
        } catch (error) {
            console.error('API Request failed:', error);
            throw new Error(
                error.response?.data?.message || 
                error.message || 
                'Network error occurred'
            );
        }
    },
    
    // Connect to robot
    async connect() {
        return await this.makeRequest('/connect', {
            method: 'POST'
        });
    },
    
    // Disconnect from robot
    async disconnect() {
        return await this.makeRequest('/disconnect', {
            method: 'POST'
        });
    },
    
    // Get robot status
    async getStatus() {
        return await this.makeRequest('/status', {
            method: 'GET'
        });
    },
    
    // Send movement/control command
    async sendCommand(command, params = {}) {
        return await this.makeRequest('/command', {
            method: 'POST',
            data: {
                command,
                params,
                timestamp: Date.now()
            }
        });
    },
    
    // Emergency stop
    async emergencyStop() {
        return await this.makeRequest('/emergency-stop', {
            method: 'POST'
        });
    },
    
    // Reset robot position
    async resetPosition() {
        return await this.makeRequest('/reset', {
            method: 'POST'
        });
    },
    
    // Get robot capabilities
    async getCapabilities() {
        return await this.makeRequest('/capabilities', {
            method: 'GET'
        });
    }
};
