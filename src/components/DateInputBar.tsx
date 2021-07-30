import { useContext } from 'react';
import styled, { css } from 'styled-components';
import { CalendarOutline, Moon, Sunny } from 'react-ionicons';
import { Input, InputIconContainer } from '../styled_components/styledComponents';
import { ThemeContext } from '../contexts/ThemeContext';
import { SelectedDateContext } from '../contexts/SelectedDateContext';
import SelectLanguage from './SelectLanguage';
import DatePicker from 'react-datepicker';
import './../react-datepicker.css';

const DateInputContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 8px 0;
`;

const TopContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    grid-gap: 1rem;
    width: 100%;
`;

const DateInput = styled(Input)`
    height: 100%;
    width: 100%;

    &::-webkit-inner-spin-button,
    &::-webkit-calendar-picker-indicator {
        display: none;
        -webkit-appearance: none;
    }
`;

const SelectLanguageDropdown = styled(SelectLanguage)`
    justify-self: end;
`;

const iconCss = css`
    justify-self: start;
    align-self: center;
    width: 32px;
    height: 32px;

    @media (min-width: 1024px) {
        transition: transform 300ms ease;

        &:hover {
            transform: scale(1.2);
            cursor: pointer;
        }
    }
`;

const DarkModeIcon = styled(Moon)`
    ${iconCss}
`;

const LightModeIcon = styled(Sunny)`
    ${iconCss}
`

// const MobileSearchButton = styled(Search)`
//     justify-self: end;
//     align-self: center;
//     width: 32px;
//     height: 32px;

//     @media (min-width: 768px) {
//         display: none;
//     }
// `;

const CalendarIcon = styled(CalendarOutline)`
    width: 24px;
    height: 24px;
`;

export default function DateInputBar() {
    const { theme, setTheme } = useContext(ThemeContext);
    const { selectedDate, setSelectedDate } = useContext(SelectedDateContext);

    const themeIconProps = {
        color: theme.isDarkMode ? 'white' : '#232323',
        height: '32px',
        width: '32px',
        onClick: () => setTheme({ isDarkMode: !theme.isDarkMode }) // toggles dark mode
    };

    return (
        <DateInputContainer>
            <TopContainer>
                {theme.isDarkMode ? <DarkModeIcon {...themeIconProps} /> : <LightModeIcon {...themeIconProps} />}
                <DateInputContainer>
                    <DatePicker
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date as Date)}
                        customInput={<DateInput />}
                    />
                    <InputIconContainer>
                        <CalendarIcon
                            color='black'
                            width='24px'
                            height='24px'
                        />
                    </InputIconContainer>
                </DateInputContainer>
                <SelectLanguage />
            </TopContainer>
        </DateInputContainer>
    );
}