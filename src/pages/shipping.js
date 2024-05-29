import React, { useEffect, useState } from 'react';
import { Collapse, Typography, Input, Select } from 'antd';
import { getOrders, getShipmentByID, updateShipmentStatus } from '../utils/shipping-api';

const { Title } = Typography;
const { Search } = Input;
const { Panel } = Collapse;
const { Option } = Select;

const allowedTransitions = {
    NEW: ['DISPATCHED'],
    DISPATCHED: ['PROGRESS'],
    PROGRESS: ['DELIVERED'],
    DELIVERED: []
};

export const Shipping = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await getOrders(setOrders);
        }
        fetchData();
    }, []);

    const onSearch = async (value) => {
        if (value) {
            await getShipmentByID(value, (data) => {
                setOrders([data]);
            });
        } else {
            await getOrders(setOrders);
        }
    };

    const Order = ({ id, createdAt, buyerId, dueDate, status, orderID }) => {
        const [selectedStatus, setSelectedStatus] = useState(status);

        const handleChange = async (value) => {
            await updateShipmentStatus(id, value);
            setSelectedStatus(value);
        };

        return (
            <div>
                <p><strong>Shipping ID: </strong> {id}</p>
                <p><strong>Order ID:</strong> {orderID}</p>
                <p><strong>Buyer ID:</strong> {buyerId}</p>
                <p><strong>Created at:</strong> {createdAt}</p>
                <p><strong>Due date:</strong> {dueDate}</p>
                <p><strong>Status:</strong>
                    <Select
                        value={selectedStatus}
                        style={{ width: 120, marginLeft: '8px' }}
                        onChange={handleChange}
                    >
                        {allowedTransitions[selectedStatus].map((statusOption) => (
                            <Option key={statusOption} value={statusOption}>{statusOption}</Option>
                        ))}
                    </Select>
                </p>
            </div>
        );
    };

    return (
        <div style={{ padding: '16px 32px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
                <Title style={{ color: '#899596' }}>Shipping</Title>
            </div>
            <div style={{ width: '500px', margin: '0 auto', marginBottom: '32px' }}>
                <Search
                    placeholder="Search by shipping ID"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                />
            </div>
            <div style={{ width: '750px', margin: '0 auto' }}>
                {orders.length > 0 && orders[0].id ?
                    <Collapse accordion>
                        {orders.map((order) => (
                            <Panel key={order.id} header={`Order #${order.orderID}`}>
                                <Order {...order} />
                            </Panel>
                        ))}
                    </Collapse> :
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Title level={4}>No orders found</Title>
                    </div>
                }
            </div>
        </div>
    );
};
