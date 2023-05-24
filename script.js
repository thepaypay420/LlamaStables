
```javascript
async function searchAddress() {
    const addressInput = document.getElementById('addressInput');
    const address = addressInput.value.trim();

    if (!address) {
        document.getElementById('result').innerHTML = 'Please enter an Ethereum address';
        return;
    }

    try {
        const openSeaAPI = 'https://api.opensea.io/api/v1/assets';
        const contractAddress = '0xe127cE638293FA123Be79C25782a5652581Db234'; // Replace with your desired ERC-721 contract address

        const response = await axios.get(`${openSeaAPI}?owner=${address}&asset_contract_address=${contractAddress}&order_direction=desc&offset=0&limit=50`);
        const assets = response.data.assets;

        if (assets.length === 0) {
            document.getElementById('result').innerHTML = 'No ERC-721 tokens found for the given address';
            return;
        }

        const resultContainer = document.getElementById('result');
        resultContainer.innerHTML = '';

        for (let i = 0; i < assets.length; i++) {
            const asset = assets[i];

            const tokenId = asset.token_id;
            const imageUrl = asset.image_url;

            const image = document.createElement('img');
            image.src = imageUrl;
            image.alt = `Token ID: ${tokenId}`;
            resultContainer.appendChild(image);
        }
    } catch (error) {
        console.error(error);
    }
}
