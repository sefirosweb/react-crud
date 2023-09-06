import { Col, Row } from "react-bootstrap"
import { DebouncedInput } from "../DebouncedInput"
import { FilterType, FilterTypeNumbers } from "../../../../types";
import { useEffect, useState } from "react";

type Props = {
    setColumnFilter: (filter: FilterType) => void;
}

export const NumbersFilter = (props: Props) => {
    const { setColumnFilter } = props;

    const [filter, setFilter] = useState<FilterTypeNumbers>({
        type: 'number',
        min: null,
        max: null
    });

    useEffect(() => {
        setColumnFilter(filter);
    }, [filter]);

    return (
        <div>
            <div className="flex space-x-2">
                <Row>
                    <Col>
                        <DebouncedInput
                            type="number"
                            value={filter.min?.toString() ?? ""}
                            onChange={(value) => {
                                const newVal = { ...filter, min: isNaN(parseFloat(value)) ? null : parseFloat(value) }
                                setFilter(newVal)
                            }}
                            placeholder="Min"
                            className="form-control"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DebouncedInput
                            type="number"
                            value={filter.max?.toString() ?? ""}
                            onChange={(value) => {
                                const newVal = { ...filter, max: isNaN(parseFloat(value)) ? null : parseFloat(value) }
                                setFilter(newVal)
                            }}
                            placeholder="Max"
                            className="form-control"
                        />
                    </Col>
                </Row>
            </div>
            <div className="h-1" />
        </div>
    )
}