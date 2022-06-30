import React from 'react';
import { Row, Col } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { useSelector } from 'react-redux';

import { PageHeader } from '../../components/page-headers/page-headers';
import { Main} from '../styled';
import { Button } from '../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';

import SampleCardSix from '../../components/cards/sampleCard/SampleCardSix';
import {cardSix } from '../../demoData/sampleCards.json';



const WidgetsCard = () => {
  
  return (
    <>
      <PageHeader
        title="Widgets Cards"
        buttons={[
          <div key="1" className="page-header-actions">
            <CalendarButtonPageHeader />
            <ExportButtonPageHeader />
            <ShareButtonPageHeader />
            <Button size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add New
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={25}>
         


          {cardSix.map(item => {
            return (
              <Col key={item.id} xxl={4} md={8} sm={12} xs={24}>
                <SampleCardSix  />
              </Col>
            );
          })}

          {/*cardSeven.map(item => {
            return (
              <Col key={item.id} xxl={6} md={12} sm={12} xs={24} className="mb-25">
                <SampleCardSeven item={item} />
              </Col>
            );
          })*/}

        </Row>
      </Main>
    </>
  );
};

export default WidgetsCard;
