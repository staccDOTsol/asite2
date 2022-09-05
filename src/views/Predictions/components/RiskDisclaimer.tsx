import { useEffect, memo, useState } from 'react'
import { useModal } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import DisclaimerModal from 'components/DisclaimerModal'
import { useUserPredictionAcceptedRisk } from 'state/user/hooks'

function RiskDisclaimer() {
  const [hasAcceptedRisk, setHasAcceptedRisk] = useState(false)//useUserPredictionAcceptedRisk()
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
            '30% of fees daily buy into the BEST/BNB pooll, then immediately burns the BEST.',
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
      onSuccess={() => setHasAcceptedRisk(false)}
    />,
    false,
    false,
  )

  useEffect(() => {
    if (!hasAcceptedRisk) {
      onPresentRiskDisclaimer()
    }

    return () => {
      onDismiss()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAcceptedRisk])

  return null
}

export default memo(RiskDisclaimer)
