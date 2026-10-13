const axios = require('axios');

async function testDirectAPI() {
  try {
    console.log('Testing direct API call to Alibaba...');
    const response = await axios.post(
      'https://token-plan.cn-beijing.maas.aliyuncs.com/compatible-mode/v1/images/generations',
      {
        model: 'qwen-image-2.0',
        prompt: '一只可爱的猫咪',
        n: 1,
        size: '1024x1024',
      },
      {
        headers: {
          'Authorization': `Bearer YOUR_API_KEY`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Success:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testDirectAPI();
