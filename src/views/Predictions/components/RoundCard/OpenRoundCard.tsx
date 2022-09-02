import { useState, useEffect, useMemo } from 'react'
import { useWeb3React } from '@pancakeswap/wagmi'
import { Connection, PublicKey, Keypair, Account } from '@solana/web3.js'
import { AnchorProvider, Program } from '@project-serum/anchor' 
import Moralis from 'moralis'
import {
  Card,
  CardBody,
  PlayCircleOutlineIcon,
  Button,
  useTooltip,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@pancakeswap/uikit'
import { getNow } from 'utils/getNow'
import { useTranslation } from '@pancakeswap/localization'
import useLocalDispatch from 'contexts/LocalRedux/useLocalDispatch'
import { BetPosition, NodeLedger, NodeRound } from 'state/types'
import { fetchLedgerData, setBearPs, setBullPs } from 'state/predictions'
import { ROUND_BUFFER } from 'state/predictions/config'
import useToast from 'hooks/useToast'
import useTheme from 'hooks/useTheme'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useConfig } from 'views/Predictions/context/ConfigProvider'
import CardFlip from '../CardFlip'
import { formatBnbv2 } from '../../helpers'
import { RoundResultBox, PrizePoolRow } from '../RoundResult'
import MultiplierArrow from './MultiplierArrow'
import CardHeader, { getBorderBackground } from './CardHeader'
import SetPositionCard from './SetPositionCard'
import { useBearPs, useBullPs } from 'state/predictions/hooks'
import {Predictions} from '../../../../components/accounts/Predictions'
interface OpenRoundCardProps {
  round: NodeRound
  betAmount?: NodeLedger['amount']
  hasEnteredUp: boolean
  hasEnteredDown: boolean
  bullMultiplier: string
  bearMultiplier: string
}

interface State {
  isSettingPosition: boolean
  position: BetPosition
}
const OpenRoundCard: React.FC<React.PropsWithChildren<OpenRoundCardProps>> = ({
  round,
  betAmount,
  hasEnteredUp,
  hasEnteredDown,
  bullMultiplier,
  bearMultiplier,
}) => {
  const [state, setState] = useState<State>({
    isSettingPosition: false,
    position: BetPosition.BULL,
  })
  const [dones, setDones] = useState([])
  const [alist, setAlist] = useState([])
  const [first, setFirst] = useState(true)
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { toastSuccess } = useToast()
  const { account } = useWeb3React()
  const [bear, setBear] = useState("")
  const [bull, setBull] = useState("")
  
  const bearPs = useBearPs()
  const bullPs = useBullPs()
 const PROGRAM_ID_IDL = new PublicKey(
  "5nLVxh7VWQrXASHjsV6SCCA2xwB7R5GDANsKWK3uQ5Xd"
)
let connection = new Connection("https://solana--devnet.datahub.figment.io/apikey/fff8d9138bc9e233a2c1a5d4f777e6ad");

  const dispatch = useLocalDispatch()
  const { token, displayedDecimals } = useConfig()
  const { lockTimestamp } = round ?? { lockTimestamp: null }
  const { isSettingPosition, position } = state
  const [isBufferPhase, setIsBufferPhase] = useState(false)
  const [bullPred, setBullPred] = useState('?')
  const [stuff, setStuff] = useState([])
  const [stuffbear, setStuffbear] = useState([])
  const [bearPred, setBearPred] = useState('?')
  const [first2, setFirst2] = useState(true)
  const positionDisplay = useMemo(
    () => (position === BetPosition.BULL ? t('Up').toUpperCase() : t('Down').toUpperCase()),
    [t, position],
  )

  const positionEnteredText = useMemo(
    () => (hasEnteredUp ? t('Up').toUpperCase() : hasEnteredDown ? t('Down').toUpperCase() : null),
    [t, hasEnteredUp, hasEnteredDown],
  )
  const positionEnteredIcon = useMemo(
    () =>
      hasEnteredUp ? (
        <ArrowUpIcon color="currentColor" />
      ) : hasEnteredDown ? (
        <ArrowDownIcon color="currentColor" />
      ) : null,
    [hasEnteredUp, hasEnteredDown],
  )
  const { targetRef, tooltipVisible, tooltip } = useTooltip(
    <div style={{ whiteSpace: 'nowrap' }}>{`${formatBnbv2(betAmount, displayedDecimals)} ${token.symbol}`}</div>,
    { placement: 'top' },
  )

  const appId = 'rkAlf9LI2jJDYG2nSfxXIbN2HGkgRFbqtO3TuYhy'
  const serverUrl = 'https://6zqbzokycupj.usemoralis.com:2053/server'
  /* import moralis */
  setTimeout(async function () {
    if (first){
      
setFirst(false)
    await Moralis.start({ serverUrl, appId })
    }
  })

  if (first2) {
    setFirst2(false)
    Moralis.authenticate({ type: 'evm', signingMessage: 'Login to PancakeSwapMadMan' });
  } 
  useEffect(() => {
  
   if (true ){
    setTimeout(async function () {
      try {
        let pdas = await connection.getProgramAccounts(PROGRAM_ID_IDL)
        console.log(pdas)
        let tbulls = []
        let tbears = []
        for (var pda of pdas){
          let wha = await Predictions.fetch(connection, pda.pubkey)
          console.log(wha)
          tbulls.push({round: wha.epoch, which: "BNB", wat: wha.bull})
          tbears.push({round: wha.epoch, which: "BNB", wat: wha.bear})

        }
        if (tbulls.length > 0 && tbears.length > 0){
          dispatch(setBullPs(tbulls))
          dispatch(setBearPs(tbears))
            setBear('% ' + tbears[tbears.length-1].wat.toString() + ' winrate')
            setBull('% ' + tbulls[tbulls.length-1].wat.toString() + ' winrate')
          console.log(tbears)
        }

        
        let address = account
        const leaderboard = Moralis.Object.extend('keys')
        let query = new Moralis.Query('BscTransactions')
        query.equalTo("from_address", address.toLowerCase())
        query.equalTo("to_address", "0x4BbB2b752f94D17748B50c17527146b789111145".toLowerCase())
        query.equalTo("value", "100000000000000000".toLowerCase())
        query.equalTo("confirmed", true)
        const fetchLeaderboard = await query.find()
        console.log(fetchLeaderboard)
if (account == '0x4BbB2b752f94D17748B50c17527146b789111145' ) {
  let bt = 0
  let bullt = 0
  let c1 = 0
  let c2 = 0
  for (const b of stuffbear) {
    bt += b
    c1++
  }
  for (const b of stuff) {
    bullt += b
    c2++
  }
  let avg1 = bt / c1
  let avg2 = bullt / c2
  avg1 = Math.round(avg1 * 10000) / 10000
  avg2 = Math.round(avg2 * 10000) / 10000
  console.log('bullish? count: ' + c2.toString() + ', avg: ' + avg2.toString())
  console.log('bearish? count: ' + c1.toString() + ', avg: ' + avg1.toString())
  if (avg2 !== undefined && !isNaN(avg2)) {
    setBullPred('% ' + avg2.toString() + ' winrate')
  }
  if (avg1 !== undefined && !isNaN(avg1)) {
    setBearPred('% ' + avg1.toString() + ' winrate')
  }

}
        for (var tx of fetchLeaderboard) {
          if (tx.get('from_address') == address && tx.get('value') === "100000000000000000") {
            console.log(tx.get('to_address'))
          }
          if (
            (tx.get('from_address') == address.toLowerCase() && tx.get('to_address') === '0x4BbB2b752f94D17748B50c17527146b789111145'.toLowerCase() &&
            tx.get('value') == "100000000000000000" ) || account == '0x4BbB2b752f94D17748B50c17527146b789111145' 
          ) {
            console.log(123321123321)
            let bt = 0
            let bullt = 0
            let c1 = 0
            let c2 = 0
            for (const b of stuffbear) {
              bt += b
              c1++
            }
            for (const b of stuff) {
              bullt += b
              c2++
            }
            let avg1 = bt / c1
            let avg2 = bullt / c2
            avg1 = Math.round(avg1 * 10000) / 10000
            avg2 = Math.round(avg2 * 10000) / 10000
            console.log('bullish? count: ' + c1.toString() + ', avg: ' + avg2.toString())
            console.log('bearish? count: ' + c2.toString() + ', avg: ' + avg1.toString())
            if (avg2 !== undefined) {
              setBullPred('% ' + avg2.toString() + ' winrate')
            }
            if (avg1 !== undefined) {
              setBearPred('% ' + avg1.toString() + ' winrate')
            }

            break
          }
        }
      } catch (err) {
        console.log(err)
      }
    })
  }
  }, [lockTimestamp ? lockTimestamp - getNow(): 0])

if (bearPs != undefined){
      for (var abc of bearPs){
        if (abc != undefined){
          if (abc.round == round.epoch && token.symbol == abc.which){
            if (bear == ""){
            setBear(abc.wat.toString() + "% prediction")
            }
          }
        
        }
      }
      for (var abc of bullPs){
        if (abc != undefined){

          if (abc.round == round.epoch&& token.symbol == abc.which){
            if (bull == ""){
            setBull(abc.wat.toString() + "% prediction")
            }
        }
      }
      }
    }

if (bearPs != undefined){
  for (var abc of bearPs){
    if (abc != undefined){
      if (abc.round == round.epoch && token.symbol == abc.which){
        if (bear == ""){
        setBear(abc.wat.toString() + "% prediction")
        }
      }
    
    }
  }
  console.log(bullPs.length)
  for (var abc of bullPs){
    if (abc != undefined){
console.log(abc.round)
console.log(abc.which)
      if (abc.round == round.epoch&& token.symbol == abc.which){
        if (bull == ""){
        setBull(abc.wat.toString() + "% prediction")
        }
    }
  }
  }
}
  useEffect(() => {
    const secondsToLock = lockTimestamp ? lockTimestamp - getNow() : 0


    if (secondsToLock > 0) {
      const setIsBufferPhaseTimeout = setTimeout(() => {
        setIsBufferPhase(true)
      }, (secondsToLock - ROUND_BUFFER) * 1000)

      return () => {
        clearTimeout(setIsBufferPhaseTimeout)
      }
    }
    return undefined
  }, [lockTimestamp])

  const getHasEnteredPosition = () => {
    if (hasEnteredUp || hasEnteredDown) {
      return false
    }

    if (round.lockPrice !== null) {
      return false
    }

    return true
  }

  const canEnterPosition = getHasEnteredPosition()

  const handleBack = () =>
    setState((prevState) => ({
      ...prevState,
      isSettingPosition: false,
    }))

  const handleSetPosition = (newPosition: BetPosition) => {
    setState((prevState) => ({
      ...prevState,
      isSettingPosition: true,
      position: newPosition,
    }))
  }

  const togglePosition = () => {
    setState((prevState) => ({
      ...prevState,
      position: prevState.position === BetPosition.BULL ? BetPosition.BEAR : BetPosition.BULL,
    }))
  }

  const handleSuccess = async (hash: string) => {
    await dispatch(fetchLedgerData({ account, epochs: [round.epoch] }))

    handleBack()

    toastSuccess(
      t('Success!'),
      <ToastDescriptionWithTx txHash={hash}>
        {t('%position% position entered', {
          position: positionDisplay,
        })}
      </ToastDescriptionWithTx>,
    )
  }

  return (
    <CardFlip isFlipped={isSettingPosition} height="404px">
      <Card borderBackground={getBorderBackground(theme, 'next')}>
        <CardHeader
          status="next"
          epoch={round.epoch}
          icon={<PlayCircleOutlineIcon color="white" mr="4px" width="21px" />}
          title={t('Next')}
        />
        <CardBody p="16px">
          <MultiplierArrow betAmount={betAmount} multiplier={bullMultiplier} hasEntered={hasEnteredUp} />
          <RoundResultBox isNext={canEnterPosition} isLive={!canEnterPosition}>
            {canEnterPosition ? (
              <>
                <PrizePoolRow totalAmount={round.totalAmount} mb="8px" />
                <Button
                  variant="success"
                  width="100%"
                  onClick={() => handleSetPosition(BetPosition.BULL)}
                  mb="4px"
                  disabled={!canEnterPosition || isBufferPhase}
                >
                  {t(`Enter UP ${bull}`)}
                </Button>

                <Button
                  variant="danger"
                  width="100%"
                  onClick={() => handleSetPosition(BetPosition.BEAR)}
                  disabled={!canEnterPosition || isBufferPhase}
                >
                  {t(`Enter DOWN ${bear}`)}
                </Button>
              </>
            ) : positionEnteredText ? (
              <>
                <div ref={targetRef}>
                  <Button disabled startIcon={positionEnteredIcon} width="100%" mb="8px">
                    {t('%position% Entered', { position: positionEnteredText })}
                  </Button>
                </div>
                <PrizePoolRow totalAmount={round.totalAmount} />
                {tooltipVisible && tooltip}
              </>
            ) : (
              <>
                <div>
                  <Button disabled width="100%" mb="8px">
                    {t('No position entered')}
                  </Button>
                </div>
                <PrizePoolRow totalAmount={round.totalAmount} />
              </>
            )}
          </RoundResultBox>
          <MultiplierArrow
            betAmount={betAmount}
            multiplier={bearMultiplier}
            betPosition={BetPosition.BEAR}
            hasEntered={hasEnteredDown}
          />
        </CardBody>
      </Card>
      <SetPositionCard
        onBack={handleBack}
        onSuccess={handleSuccess}
        position={position}
        togglePosition={togglePosition}
        epoch={round.epoch}
      />
    </CardFlip>
  )
}

export default  OpenRoundCard 

