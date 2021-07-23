import { useState } from 'react';
import { Search } from 'react-ionicons';
import styled from 'styled-components';
import { Input, InputIconContainer } from '../styled_components/styledComponents';

const Container = styled.div`
    width: 100%;
    justify-content: center;
    margin-bottom: 32px;
    display: flex;
`;

const LocationInputContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 80%;

    @media(min-width: 768px) {
        width: 50%;
    }
`;

const LocationInputBar = styled(Input)`
    text-align: left;
    padding: 8px;
    font-size: 16px;
    width: 100%;
`;

const SearchIconContainer = styled(InputIconContainer)`
    padding: 8px;
`;

const SearchIcon = styled(Search)`
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: transform 300ms ease;

    @media (min-width: 768px) {
        &:hover {
            transform: scale(1.1)
        }
    }
`;

export default function LocationInput() {
    const [input, setInput] = useState<string>('');

    return (
        // TODO: input autocomplete cities/areas with geodb api
        <Container>
            <LocationInputContainer>
                <LocationInputBar
                    type='text'
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder='Enter a location...'
                />
                <SearchIconContainer>
                    <SearchIcon
                        color='black'
                        width='24px'
                        height='24px'
                    />
                </SearchIconContainer>
            </LocationInputContainer>
        </Container>
    );
}