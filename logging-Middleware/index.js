// utils/apiLogger.js
import axios from 'axios';
export async function Log(stack, level, pkg, message) {
  try {
    await axios.post('http://20.244.56.144/evaluation-service/logs', {
      stack,
      level,
      package: pkg,
      message,
      timestamp: new Date().toISOString()
    },{
        auth:`Bearer ${process.env.SECRET_TOKEN}`
    });
  } catch (error) {
    console.error('Failed to send log to server:', error.message);
  }
}



