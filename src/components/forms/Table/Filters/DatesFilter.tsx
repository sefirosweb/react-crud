import { Col, Row } from "react-bootstrap"
import { DebouncedInput } from "../DebouncedInput"
import { FilterType, FilterTypeDates } from "../../../../types";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";

type Props = {
    setColumnFilter: (filter: FilterType) => void;
}

export const DatesFilter = (props: Props) => {
    const { setColumnFilter } = props;

    const [filter, setFilter] = useState<FilterTypeDates>({
        type: 'date',
        min: null,
        max: null
    });

    useEffect(() => {
        setColumnFilter(filter);
    }, [filter]);

    return (
        <>
            <Row>
                <Col>
                    <DebouncedInput
                        type="date"
                        value={!filter.min ? "" : (DateTime.fromMillis(filter.min).toISODate() ?? '')}
                        onChange={(value) => {
                            const newValue = DateTime.fromISO(value).toMillis();
                            const newFilter = { ...filter, min: isNaN(newValue) ? null : newValue }
                            setFilter(newFilter)
                        }}
                        placeholder="Min"
                        className="form-control"
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <DebouncedInput
                        type="date"
                        value={!filter.max ? "" : (DateTime.fromMillis(filter.max).toISODate() ?? '')}
                        onChange={(value) => {
                            const newValue = DateTime.fromISO(value).toMillis();
                            const newFilter = { ...filter, max: isNaN(newValue) ? null : newValue }
                            setFilter(newFilter)
                        }}
                        placeholder="Max"
                        className="form-control"
                    />
                </Col>
            </Row>
        </>
    )
}