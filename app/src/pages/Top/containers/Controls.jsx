import React, { useContext } from 'react';
import { Selector } from 'components';
import { PLAYER_TYPES, PLAYER_BUILDS, ALL_METRICS } from 'config';
import { capitalize, getPlayerIcon, getPlayerBuild, getMetricIcon, getMetricName } from 'utils';
import { TopContext } from '../context';

const PLAYER_TYPES_OPTIONS = [
  { label: 'All player types', value: null },
  ...PLAYER_TYPES.map(type => ({
    label: capitalize(type),
    icon: getPlayerIcon(type),
    value: type
  }))
];

const PLAYER_BUILDS_OPTIONS = [
  { label: 'All player builds', value: null },
  ...PLAYER_BUILDS.map(type => ({
    label: getPlayerBuild(type),
    value: type
  }))
];

const METRIC_OPTIONS = ALL_METRICS.map(metric => ({
  label: getMetricName(metric),
  icon: getMetricIcon(metric, true),
  value: metric
}));

function Controls() {
  const { context, updateContext } = useContext(TopContext);
  const { metric, type, build } = context;

  const metricIndex = METRIC_OPTIONS.findIndex(o => o.value === metric);
  const playerTypeIndex = PLAYER_TYPES_OPTIONS.findIndex(o => o.value === type);
  const playerBuildIndex = PLAYER_BUILDS_OPTIONS.findIndex(o => o.value === build);

  const handleMetricSelected = e => {
    if (!e || !e.value) return;
    updateContext({ metric: e.value });
  };

  const handleTypeSelected = e => {
    updateContext({ type: e.value });
  };

  const handleBuildSelected = e => {
    updateContext({ build: e.value });
  };

  return (
    <>
      <div className="col-lg-4 col-md-6">
        <Selector
          options={METRIC_OPTIONS}
          selectedIndex={metricIndex}
          onSelect={handleMetricSelected}
          search
        />
      </div>
      <div className="col-lg-2 col-md-4">
        <Selector
          options={PLAYER_TYPES_OPTIONS}
          selectedIndex={playerTypeIndex}
          onSelect={handleTypeSelected}
        />
      </div>
      <div className="col-lg-3 col-md-5">
        <Selector
          options={PLAYER_BUILDS_OPTIONS}
          selectedIndex={playerBuildIndex}
          onSelect={handleBuildSelected}
        />
      </div>
    </>
  );
}

export default Controls;
