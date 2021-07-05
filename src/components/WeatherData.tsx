import { useContext } from 'react';
import styled from 'styled-components';
import { SelectedDateContext } from '../contexts/SelectedDateContext';
import { format } from '../helpers/DateFormat';
import { Text, Title } from '../styled_components/styledComponents';
import { Severity } from './enums/enums';

const Container = styled.div`
    // flex: 1;
    background-color: #4C65E9;
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 16px;
    width: 80%;
    align-self: center;
    display: flex;
    flex-direction: column;
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.3);
`;

const StyledDataContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 8px;

    &:first-child {
        margin-top: 16px;
    }

    &:last-child {
        margin-bottom: 0;
    }
`;

const LocationTitle = styled(Title)`
    font-size: 20px;
`;

const DateText = styled(Text)`
    font-size: 18px;
`;

const DataText = styled(Text)`
    font-size: 16px;
`;

const ValueText: any = styled(DataText)`
    font-weight: bold;
    color: ${(props: any) => getSeverityColor(props.severity)}; // use props/data to determine color by severity
`;

const DataContainers = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
`;

function getSeverityColor(severity: Severity): string {
    switch (severity) {
        case Severity.great:
            return '#33cd18';
        case Severity.good:
            return '#72CD18';
        case Severity.ok:
            return '#d6cc11';
        case Severity.severe:
            return '#e3815b';
        case Severity.verySevere:
            return '#F16060';
    }
}

interface DataContainerProps {
    valueName: string,
    value: string | number,
    severity: Severity
}

function DataContainer(props: DataContainerProps) {
    return (
        <StyledDataContainer>
            <DataText>{props.valueName}</DataText>
            <ValueText severity={props.severity}>{props.value}</ValueText>
        </StyledDataContainer>
    )
}

export default function WeatherData() {
    const { selectedDate } = useContext(SelectedDateContext);

    return (
        <Container>
            <div>
                <LocationTitle as='h1'>Accra, Ghana</LocationTitle>
                <DateText>{format(selectedDate)}</DateText>
            </div>
            <DataContainers>
                <DataContainer
                    valueName='Pressure'
                    value='1000.7mb'
                    severity={Severity.ok}
                />
                <DataContainer
                    valueName='Humidity'
                    value='77%'
                    severity={Severity.ok}
                />
                <DataContainer
                    valueName='Soil moisture'
                    value='3.3cm'
                    severity={Severity.ok}
                />
                <DataContainer
                    valueName='Rain'
                    value='Heavy rain'
                    severity={Severity.verySevere}
                />
                <DataContainer
                    valueName='Wind'
                    value='12km/h'
                    severity={Severity.good}
                />
                <DataContainer
                    valueName='Air quality'
                    value='Great'
                    severity={Severity.great}
                />
            </DataContainers>
        </Container>
    );
}