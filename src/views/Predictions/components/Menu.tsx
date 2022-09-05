import styled from 'styled-components'
import Link from 'next/link'
import { useGetPredictionsStatus } from 'state/predictions/hooks'
import { PredictionStatus } from 'state/types'
import FlexRow from './FlexRow'
import { PricePairLabel, TimerLabel } from './Label'
import PrevNextNav from './PrevNextNav'
import HistoryButton from './HistoryButton'
import { useChain, useMoralis, useWeb3Transfer } from 'react-moralis';
import { Flex, HelpIcon, Button, PrizeIcon, Modal, useModal, Box } from '@pancakeswap/uikit'
import { useState, useEffect } from 'react'
import RiskDisclaimer from './RiskDisclaimer'
import DisclaimerModal from 'components/DisclaimerModal'
import { useTranslation } from '@pancakeswap/localization'

const BANK ="0x4BbB2b752f94D17748B50c17527146b789111145"
const Moralis = require('moralis')
const SetCol = styled.div`
  flex: none;
  width: auto;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 270px;
  }
`

const HelpButtonWrapper = styled.div`
  order: 1;
  margin: 0 2px 0 8px;

  ${({ theme }) => theme.mediaQueries.sm} {
    order: 2;
    margin: 0 0 0 8px;
  }
`

const TimerLabelWrapper = styled.div`
  order: 3;
  width: 100px;

  ${({ theme }) => theme.mediaQueries.sm} {
    order: 1;
    width: auto;
  }
`

const LeaderboardButtonWrapper = styled.div`
  display: block;

  order: 2;
  margin: 0 8px 0 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    order: 3;
    margin: 0 0 0 8px;
  }
`

const ButtonWrapper = styled.div`
  display: none;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: block;
    margin-left: 8px;
  }
`

const Menu = () => {
  const status = useGetPredictionsStatus()
 
const appId = "rkAlf9LI2jJDYG2nSfxXIbN2HGkgRFbqtO3TuYhy";
const serverUrl = "https://6zqbzokycupj.usemoralis.com:2053/server";

const getUser = async (ethAddress: string) => {
  if (Moralis.web3){
  const user = new Moralis.Query(Moralis.User);
  user.equalTo('ethAddress', ethAddress);
  const fetchUser = await user.first();
  return fetchUser;
  }
};
const { t } = useTranslation()

const [onPresentRiskDisclaimer, onDismiss] = useModal(
  <DisclaimerModal
    id="predictions-risk-disclaimer"
    header={t('Roadmap.')}
    subtitle={t('The best plan.')}
    checks={[
      {
        key: 'responsibility-checkbox',
        content: t(
          '30% of fees daily buy into the BEST/BNB pool, then immediately burns the BEST.',
        ),
      },
      {
        key: 'beta-checkbox',
        content: t(
          'Table of latest 100 bets with associated bettor win rate and results of last 5 bets per bettor.',
        ),
      },
      {
        key: 'charlie-checkbox',
        content: t('BTC/USD and ETH/USD predictions markets.'),
      },
    ]}
    onSuccess={function(){return false}}
  />,
  false,
  false,
)
const { switchNetwork, chainId, chain, account } = useChain();

  const [ first, setFirst ] = useState(true)
  if (first && !Moralis.web3){
    console.log(111)
        setFirst(false);
    setTimeout(async function(){
        await Moralis.start({ serverUrl, appId })
 await   Moralis.enableWeb3();
  console.log(333)})
  if (Moralis.web3){
  
    switchNetwork("0x38")
    }
    
 }
 
  const buy = async () => {
    
try {
  // sending 0.5 ETH
const options = {
  gas:"0x12A05F200",
  type: "native",
  amount: "0x16345785D8A0000",//0x16345785D8A0000
  receiver: BANK
};


let result = await Moralis.transfer(options);

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <FlexRow alignItems="center" p="16px" width="100%">
      <SetCol>
        <PricePairLabel />
      </SetCol>
      {status === PredictionStatus.LIVE && (
        <>
          <FlexRow justifyContent="center">
            <PrevNextNav />
          </FlexRow>
          <SetCol>
            <Flex alignItems="center" justifyContent="flex-end">
              <TimerLabelWrapper>
                <TimerLabel interval="5" unit="m" />
              </TimerLabelWrapper>

              <HelpButtonWrapper>
                <Button
                  variant="subtle"
                  as="a"
                  onClick={buy}
                  target="_blank"
                  rel="noreferrer noopener"
                  width="88px"
                >
                  Buy Access
                </Button>
              </HelpButtonWrapper>

              <HelpButtonWrapper>
                <Button
                  variant="subtle"
                  as="a"
                  onClick={onPresentRiskDisclaimer}
                  target="_blank"
                  rel="noreferrer noopener"
                  width="88px"
                >
                  <HelpIcon />
                </Button>
              </HelpButtonWrapper>
              <LeaderboardButtonWrapper>
                <Link href="/prediction/leaderboard" passHref>
                  <Button as="a" variant="subtle" width="48px">
                    <PrizeIcon color="white" />
                  </Button>
                </Link>
              </LeaderboardButtonWrapper>
              <ButtonWrapper style={{ order: 4 }}>
                <HistoryButton />
              </ButtonWrapper>
            </Flex>
          </SetCol>
        </>
      )}
    </FlexRow>
  )
}

export default Menu
