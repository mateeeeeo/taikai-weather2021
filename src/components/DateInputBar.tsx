import { useState, useContext } from 'react';
import styled from 'styled-components';
import { CalendarOutline, Cog } from 'react-ionicons';
import { Input, InputIconContainer } from '../styled_components/styledComponents';
import { ThemeContext } from '../contexts/ThemeContext';
import { SelectedDateContext } from '../contexts/SelectedDateContext';
import { inputFormat } from '../helpers/DateFormat';
import DatePicker from 'react-datepicker';
import './../react-datepicker.css';

const DateInputContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 8px 0;
`;

const TopContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    width: 100%;
`;

const DateInput = styled(Input)`
    height: 100%;
    
    &::-webkit-inner-spin-button,
    &::-webkit-calendar-picker-indicator {
        display: none;
        -webkit-appearance: none;
    }
`;

const MobileSettingsButton = styled(Cog)`
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
    // cursor: pointer;

    // // transition: transform 300ms ease;

    // // @media (min-width: 768px) {
    // //     &:hover {
    // //         transform: scale(1.1)
    // //     }
    // // }
`;

export default function DateInputBar() {
    const { theme, setTheme } = useContext(ThemeContext);
    const { selectedDate, setSelectedDate } = useContext(SelectedDateContext);

    return (
        <DateInputContainer>
            <TopContainer>
                <MobileSettingsButton
                    color={theme.isDarkMode ? 'white' : '#232323'}
                    height='32px'
                    width='32px'
                    onClick={() => { setTheme({ isDarkMode: !theme.isDarkMode }) }} // toggles dark mode
                />
                <DateInputContainer>
                    {/* <DateInput
                        type='date'
                        placeholder='Enter a date'
                        value={inputFormat(selectedDate)}
                        onChange={e => setDateInput(e.target.value)}
                    /> */}
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
                {/* <MobileSearchButton
                    color={theme.isDarkMode ? 'white' : '#232323'}
                    height='32px'
                    width='32px'
                /> */}
            </TopContainer>
        </DateInputContainer>
    );
}