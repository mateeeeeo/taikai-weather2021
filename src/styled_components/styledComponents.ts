import styled from 'styled-components';

export const Text = styled.p`
    color: ${({ isDarkMode }: { isDarkMode: boolean }) => isDarkMode ? 'white' : '#232323'};
    font-family: 'Lato';
    font-size: 24px;
    vertical-align: middle;
`;

export const Title = styled(Text)`
    font-size: 32px;
    font-weight: bold;
`;

export const Input = styled.input`
    padding-bottom: 5px;
    background-color: #4C65E9;
    color: white;
    font-family: 'Lato';
    font-weight: 400;
    font-size: 18px;
    border: none;
    outline: none;
    border-radius: 8px 0 0 8px;
    text-align: center;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3);

    &::placeholder {
        color: white;
    }
`;

export const InputIconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #DBDBDB;
    padding: 6px;
    border-radius: 0 8px 8px 0;
`;