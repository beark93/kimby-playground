import React, { useState, useEffect, useCallback } from 'react';

import { Grid, Tabs, Tab } from '@mui/material';

import UberSkeleton from '@components/Skeleton/UberSkeleton';
import LabelProgress from '@components/Progress/LabelProgress';
import BasicHeader from '@components/Header/BasicHeader';
import RefreshButton from '@components/Button/RefeshButton';
import { getUberList } from '@api/uber';
import {
  UberType,
  getUberLabel,
  getUberProgressValue,
  getUberProgressColor,
  getDefaultUberList,
} from '@utils/uber';

const defaultList = getDefaultUberList();

const tabStyle = {
  fontSize: {
    zero: '0.8rem',
    max: 'h6.fontSize',
  },
  p: {
    zero: 0.5,
    max: 2,
  },
};

const Header = ({
  ladder,
  onChange,
  onClick,
}: {
  ladder: string;
  onChange: (_: React.SyntheticEvent, newLadder: string) => void;
  onClick: () => void;
}) => {
  return (
    <BasicHeader right={<RefreshButton onClick={onClick} />}>
      <Tabs
        value={ladder}
        variant='fullWidth'
        scrollButtons={false}
        onChange={onChange}
      >
        <Tab value='1' label='Ladder' sx={tabStyle} />
        <Tab value='2' label='Non Ladder' sx={tabStyle} />
      </Tabs>
    </BasicHeader>
  );
};
const MemoizedHeader = React.memo(Header);

const UberList = () => {
  const [displayList, setDisplayList] = useState<UberType[]>(defaultList);
  const [data, setData] = useState<UberType[]>([]);
  const [ladder, setLadder] = useState('1');
  const [isLoading, setIsLoading] = useState(true);

  const callUberApi = () =>
    getUberList().then((res) => {
      setData(res.data.items);
      setIsLoading(false);
    });

  const onChangeLadder = useCallback(
    (_: React.SyntheticEvent, newLadder: string) => {
      setDisplayList(defaultList);
      setLadder(newLadder);
    },
    []
  );

  const onClickRefesh = useCallback(() => {
    if (!isLoading) {
      setIsLoading(true);
      callUberApi();
    }
  }, [isLoading]);

  useEffect(() => {
    callUberApi();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setDisplayList(
        data
          .filter((it) => it.ladder === ladder)
          .toSorted(function (a, b) {
            return parseInt(a.hc) - parseInt(b.hc);
          })
          .toSorted(function (a, b) {
            return parseInt(a.ladder) - parseInt(b.ladder);
          })
          .toSorted(function (a, b) {
            return parseInt(a.region) - parseInt(b.region);
          })
      );
    }
  }, [ladder, data]);

  return (
    <>
      <MemoizedHeader
        ladder={ladder}
        onChange={onChangeLadder}
        onClick={onClickRefesh}
      />
      <Grid container spacing={4}>
        {isLoading
          ? defaultList.map((_, idx) => (
              <UberSkeleton key={`skeleton-${idx}`} />
            ))
          : displayList.map((it) => (
              <LabelProgress
                key={`${it.region}-${it.hc}`}
                label={getUberLabel(it.progress, it.region, it.hc)}
                value={getUberProgressValue(it.progress)}
                color={getUberProgressColor(it.progress)}
              />
            ))}
      </Grid>
    </>
  );
};

export default UberList;
