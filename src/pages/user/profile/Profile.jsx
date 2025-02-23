import React from 'react'
import CustomSidebar from '../../../components/user/sidebar/CustomSidebar';
import { Outlet } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
export default function Profile() {
  return (
    <>
    <Container fluid className='p-0'>
        <Row>
            <Col md={2}>
            <CustomSidebar/>
            </Col>

            <Col md={8}>
            <Outlet/>
            </Col>
        </Row>
    </Container>
   
   
    </>

  )
}
