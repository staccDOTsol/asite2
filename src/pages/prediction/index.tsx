

import PredictionConfigProviders from '../../views/Predictions/context/PredictionConfigProviders'
import Predictions from '../../views/Predictions'
import styled from 'styled-components'

export default function Prediction() {


  const HelpButtonWrapper = styled.div`
  order: 1;
  margin: 0 2px 0 8px;

  ${({ theme }) => theme.mediaQueries.sm} {
    order: 2;
    margin: 0 0 0 8px;
  }
`
  return (
  <div>
    <Predictions /> </div>)
  
}

Prediction.Layout = PredictionConfigProviders
