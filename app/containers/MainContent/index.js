import React from 'react';
import PageTemplate from '../PageTemplate';
import { Slider } from '../../components/Carousel';
import { Cards } from '../Cards';

export function Ads() {
  return (
    <PageTemplate>
      <Slider />
      <Cards />
    </PageTemplate>
  );
}
