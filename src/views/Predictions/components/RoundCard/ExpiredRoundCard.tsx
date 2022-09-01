import styled from 'styled-components'
import { Card, Box, BlockIcon, CardBody } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { NodeRound, BetPosition, NodeLedger } from 'state/types'
import { useBearPs, useBullPs, useGetBufferSeconds } from 'state/predictions/hooks'
import { getHasRoundFailed } from 'state/predictions/helpers'
import useTheme from 'hooks/useTheme'
import { getRoundPosition } from '../../helpers'
import { RoundResult } from '../RoundResult'
import MultiplierArrow from './MultiplierArrow'
import CardHeader, { getBorderBackground } from './CardHeader'
import CollectWinningsOverlay from './CollectWinningsOverlay'
import CanceledRoundCard from './CanceledRoundCard'
import CalculatingCard from './CalculatingCard'
import { useState } from 'react' 
import { useConfig } from 'views/Predictions/context/ConfigProvider'


interface ExpiredRoundCardProps {
  round: NodeRound
  betAmount?: NodeLedger['amount']
  hasEnteredUp: boolean
  hasEnteredDown: boolean
  hasClaimedUp: boolean
  hasClaimedDown: boolean
  bullMultiplier: string
  bearMultiplier: string
  isActive?: boolean
}

const StyledExpiredRoundCard = styled(Card)`
  opacity: 0.7;
  transition: opacity 300ms;

  &:hover {
    opacity: 1;
  }
`

const ExpiredRoundCard: React.FC<React.PropsWithChildren<ExpiredRoundCardProps>> = ({
  round,
  betAmount,
  hasEnteredUp,
  hasEnteredDown,
  hasClaimedUp,
  hasClaimedDown,
  bullMultiplier,
  bearMultiplier,
  isActive,
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { token, displayedDecimals } = useConfig()
  const { epoch, lockPrice, closePrice } = round
  const betPosition = getRoundPosition(lockPrice, closePrice)
  const bufferSeconds = useGetBufferSeconds()
  const hasRoundFailed = getHasRoundFailed(round.oracleCalled, round.closeTimestamp, bufferSeconds)
const [bear, setBear] = useState("")
const [bull, setBull] = useState("")

const bearPs = useBearPs()
const bullPs = useBullPs()
  if (hasRoundFailed) {
    return <CanceledRoundCard round={round} />
  }

  if (!closePrice) {
    return <CalculatingCard round={round} hasEnteredDown={hasEnteredDown} hasEnteredUp={hasEnteredUp} />
  }

  const cardProps = isActive
    ? {
        isActive,
      }
    : {
        borderBackground: getBorderBackground(theme, 'expired'),
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
  return (
    <Box position="relative">
      <StyledExpiredRoundCard {...cardProps}>
        <CardHeader
          status="expired"
          icon={<BlockIcon mr="4px" width="21px" color="textDisabled" />}
          title={t('Expired')}
          epoch={round.epoch}
        />
        <CardBody p="16px" style={{ position: 'relative' }}>
          {bull}
          <MultiplierArrow
            betAmount={betAmount}
            multiplier={bullMultiplier}
            isActive={betPosition === BetPosition.BULL}
            hasEntered={hasEnteredUp}
            hasClaimed={hasClaimedUp}
            isHouse={betPosition === BetPosition.HOUSE}
          />
          <RoundResult round={round} hasFailed={hasRoundFailed} />
          <MultiplierArrow
            betAmount={betAmount}
            multiplier={bearMultiplier}
            betPosition={BetPosition.BEAR}
            isActive={betPosition === BetPosition.BEAR}
            hasEntered={hasEnteredDown}
            hasClaimed={hasClaimedDown}
            isHouse={betPosition === BetPosition.HOUSE}
          />
          {bear}
        </CardBody>
      </StyledExpiredRoundCard>
      <CollectWinningsOverlay epoch={epoch} isBottom={hasEnteredDown} />
    </Box>
  )
}

export default ExpiredRoundCard