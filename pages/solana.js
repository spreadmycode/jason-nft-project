import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Button from "@material-ui/core/Button";
import { useState, useEffect } from 'react'
import { isNil } from "lodash";
import { injected } from "../util/injected"
import { useWeb3React } from "@web3-react/core"
import { contractAbi } from '../util/contractAbi';
import { contractAddress } from '../util/contractAddress';
import Web3 from 'web3';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function Home() {
  const { active, account, connector, activate } = useWeb3React();
  const [imageName, setImageName] = useState(1);
  const [titleColor, setTitleColor] = useState("white");
  const [buttonVisibility, setButtonVisibility] = useState("visible");
  const [imageOpacity, setImageOpacity] = useState(1);
  const [bottomMessageVisibility, setBottomMessageVisibility] = useState("visible");
  const [quantity, setQuantity] = useState(1);
  const [walletIsPresale, setWalletIsPresale] = useState(false);
  const [presaleActive, setPresaleActive] = useState(false);
  const [saleActive, setSaleActive] = useState(false);

  const options = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ];
  const defaultOption = options[0];

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  useEffect(() => {
    async function connectWallet() {
      try {
        await activate(injected);
      } catch (ex) {
        console.log(ex)
      }
    }
    connectWallet();

    checkUserPresale();
    flickerTitle();
    flickerImage();
    flickerButton();
    flickerBottomMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkUserPresale = async () => {
    // const web3 = new Web3(Web3.givenProvider || "https://mainnet.infura.io/v3/8a0dea1e0ab4414c987fc0c953cc97e7")
    // const accounts = await web3.eth.getAccounts()
    // const nftContract = new web3.eth.Contract(contractAbi, contractAddress)
    // // Check presale
    // const saleActive = await nftContract.methods.saleActive().call();
    // console.log(saleActive)
    // setSaleActive(saleActive);

    // const headers = new Headers();
    // headers.append('pragma', 'no-cache');
    // const reqData = {
    //   headers: headers
    // }
    // const data = await fetch('./api/presaleWallets', reqData);
    // const presaleWallets = await data.json();
    // if (presaleWallets.includes(accounts[0])) {
    //   setWalletIsPresale(true);
    // }
  }

  const handleClick = async (account) => {
    // const Web3 = require('web3');
    // let { provider } = await connector.activate();
    // let web3 = new Web3(provider);

    // if (presaleActive) {
    //   try {
    //     const nftContract = await new web3.eth.Contract(contractAbi, contractAddress);
    //     const price = await nftContract.methods.price().call();
    //     await nftContract.methods.apeBuy(quantity).send({
    //       from: account,
    //       value: quantity * price
    //     })
    //       .on('transactionHash', (hash) => {
    //         console.log('hash!', hash);
    //       })
    //       .on('receipt', (receipt) => {
    //         console.log('receipt!', receipt)
    //       })
    //       .on('error', (error, receipt) => {
    //         console.log('error! ', error)
    //       })
    //     console.log('Buying with: ', account);
    //   } catch (error) {
    //     console.log("CAUGHT: ", error)
    //   }
    // }
  }

  const onSelect = (value) => {
    setQuantity(value.value);
  }

  async function flickerTitle() {
    let intervalTime = 55;
    var counter = 0;

    const interval = setInterval(() => {
      counter++;
      setTitleColor((current) => {
        return current == "white" ? "transparent" : "white"
      });
      if (counter > 14) {
        setTitleColor("white");
        clearInterval(interval);
      }
    },
      counter != 5 ? intervalTime : 130
    );
    return () => {
      clearInterval(interval);
    };
  }

  async function flickerImage() {
    let intervalTime = 55;
    var counter = 0;

    await timeout(300);
    const interval = setInterval(() => {
      counter++;
      setImageOpacity((current) => {
        return current == 1 ? 0 : 1
      });
      if (counter > 14) {
        setImageOpacity(1);
        clearInterval(interval);
      }
    },
      counter != 5 ? intervalTime : 130
    );
    return () => {
      clearInterval(interval);
    };
  }

  async function flickerButton() {
    let intervalTime = 55;
    var counter = 0;

    await timeout(550);
    const interval = setInterval(() => {
      counter++;
      setButtonVisibility((current) => {
        return current == 'visible' ? 'hidden' : 'visible'
      });
      if (counter > 14) {
        setButtonVisibility('visible');
        clearInterval(interval);
      }
    },
      counter != 5 ? intervalTime : 130
    );
    return () => {
      clearInterval(interval);
    };
  }

  async function flickerBottomMessage() {
    let intervalTime = 55;
    var counter = 0;

    await timeout(850);
    const interval = setInterval(() => {
      counter++;
      setBottomMessageVisibility((current) => {
        return current == 'visible' ? 'hidden' : 'visible'
      });
      if (counter > 14) {
        setBottomMessageVisibility('visible');
        clearInterval(interval);
      }
    },
      counter != 5 ? intervalTime : 130
    );
    return () => {
      clearInterval(interval);
    };
  }

  useEffect(
    () => {
      const interval = setInterval(() => {
        setImageName((current) => { return current > 2 ? 1 : current + 1 });
      }, 600);
      return () => {
        clearInterval(interval);
      };
    },
    [] // empty dependency array
  );

  return (
    <div className={`${styles.contentBackground}`}>
      <div className={styles.centerScreen}>
        <div className={styles.column}>
          <h1 className={titleColor == "transparent" ? styles.headerTextHidden : styles.headerText}>The Order of Shadows</h1>
          <div className={styles.imageContainer}>
            <Image src={require(`../public/${!isNil(imageName) ? imageName : '1'}.png`)} layout="fill" className={imageOpacity == 1 ? styles.image : styles.hiddenImage} alt="" />
          </div>
          {saleActive || presaleActive &&
            <div style={{ display: "flex", alignItems: "center", flexDirection: "row", marginBottom: "10px" }}>
              <h3 style={{ margin: "7px", fontFamily: "'DwarvenAxe', Fallback, sans-serif", color: "white", fontSize: "28px", letterSpacing: "2px" }}>QTY: </h3>
              <Dropdown options={options} onChange={onSelect} value={defaultOption} placeholder="QTY" />
            </div>
          }
          <Button
            className={buttonVisibility == 'visible' ? styles.mintButton : styles.mintButtonHidden}
            color="inherit"
            aria-label="Menu"
            onClick={() => active ? handleClick(account) : connectWallet()}
          >{active ? presaleActive ? <span>MINT HERE</span> : <span>MINTING SOON</span> : <span>CONNECT WALLET</span>}
          </Button>
          <h1 className={bottomMessageVisibility == 'visible' ? styles.secondaryText : styles.hiddenSecondaryText}>ARE YOU WORTHY TO SUMMON A SYMBOL?</h1>
        </div>
      </div>
      <div style={{ position: "fixed", bottom: "0", right: '0', display: "flex !important", justifyContent: "space-between !important", width: '100%', marginRight: "20px", marginBottom: "20px" }}>
        <div></div>
        <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
          <h3 style={{ margin: "7px", fontFamily: "'DwarvenAxe', Fallback, sans-serif", color: "white", fontSize: "28px", letterSpacing: "2px" }}>LEARN MORE</h3>
          <div style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
            <a target="_blank" rel="noreferrer" href="https://twitter.com/Metaciple"><Image src={require('../public/twitter.png')} alt="" style={{ margin: "0px 2px" }} /></a>
            <div style={{ width: '10px' }}></div>
            <a target="_blank" rel="noreferrer" href="https://discord.gg/theorderofshadows"><Image src={require('../public/discord.png')} alt="" style={{ margin: "0px 2px" }} /></a>
          </div>

        </div>
      </div>
    </div>
  )
}
