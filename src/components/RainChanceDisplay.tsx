import { RainySharp } from 'react-ionicons';
import { Text } from '../styled_components/styledComponents';
import styled from 'styled-components';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { SelectedLanguageContext } from './../contexts/SelectedLanguageContext';

interface RainChanceDisplayProps {
    chance: number | undefined
}

const RainDisplayContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const RainText = styled(Text)`
    font-size: 20px;
    margin-bottom: 0.25rem;
`;

const RainIcon = styled(RainySharp)`
    width: 32px;
    height: 32px;
    margin-right: 8px;
`;

const RainValueContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RainValue = styled(Text)`
    font-size: 32px;
    font-weight: bold;
`;

export default function RainChanceDisplay(props: RainChanceDisplayProps) {
    const { theme } = useContext(ThemeContext);
    const { selectedLanguage } = useContext(SelectedLanguageContext);

    return (
        <RainDisplayContainer>
            <RainText isDarkMode={theme.isDarkMode}>{selectedLanguage?.chanceOfRain}</RainText>
            <RainValueContainer>
                <RainIcon
                    width="32px"
                    height="32px"
                    color={theme.isDarkMode ? 'white' : '#232323'} />
                <RainValue isDarkMode={theme.isDarkMode}>
                    {props.chance ?? 'N/A '}%
                </RainValue>
            </RainValueContainer>
        </RainDisplayContainer>
    );
}