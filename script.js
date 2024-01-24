const options = document.getElementById('crypto-select').addEventListener('click',fetchcryptovalue);
document.addEventListener('DOMContentLoaded',cryptoloader);
const alertprc = document.getElementById('crypto-alert');
function cryptoloader()
{
    const cryptocontainer = document.getElementById('crypto-container');
    const cryptoselect = document.getElementById('crypto-select');
    const apiURL = 'https://api.coinlore.net/api/tickers/';

    fetch(apiURL)
        .then(response => response.json())
        .then(data=> {
            data.data.forEach(crypto=>{
                const option = document.createElement('option');
                option.text = crypto.name;
                cryptoselect.appendChild(option);
            });
        })
        .catch(error=> {
            console.error('Error fetching cryptocurrency list:',error);
        });
}

function fetchcryptovalue()
{
    const fetchedvalue = document.getElementById('crypto-select').value;
    if (fetchedvalue==0)
    {
        document.getElementById('crypto-container').textContent = '';
    }
    else
    {
        const insertvalue = document.getElementById('crypto-container');
        const apiURL = `https://api.coinlore.net/api/tickers/`;
        fetch(apiURL)
            .then (response=>response.json())
            .then (data=>{
                const crypto = data.data.find(crypto=> crypto.name == fetchedvalue);
                if(crypto)
                {
                    insertvalue.textContent = crypto.price_usd;
                    const alertPrice = parseFloat(alertprc.value);
                    if(crypto.price_usd>=alertPrice)
                    {
                        document.getElementById('new-alert').innerHTML = `<b>${fetchedvalue} has surpassed your alert price.</b>`;
                    }
                    else
                    {
                        document.getElementById('new-alert').innerHTML = '';
                    }
                }
                else
                {
                    console.log("no");
                }
            })
            .catch(error=>{
                console.error('Error fetching cryptocurrency list:',error);
            })
        }
    
}