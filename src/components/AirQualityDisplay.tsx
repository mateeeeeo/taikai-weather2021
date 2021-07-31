import styled from 'styled-components';
import { ThemeContext } from '../contexts/ThemeContext';
import { Text } from './../styled_components/styledComponents';
import { useContext, useState } from 'react';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const AirQualityText = styled(Text)`
    font-size: 20px;
    margin-bottom: 0.25rem;
`;

export default function AirQualityDisplay() {
    const { theme } = useContext(ThemeContext);
    
    const [fetching, setFetching] = useState(false);

    return(
        <Container>
            <AirQualityText isDarkMode={theme.isDarkMode}>Air Quality</AirQualityText>
        </Container>
    );
}