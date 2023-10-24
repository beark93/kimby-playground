import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';

import { Grid, Tabs, Tab } from '@mui/material';

import UberSkeleton from '@components/Skeleton/UberSkeleton';
import LabelProgress from '@components/Progress/LabelProgress';
import BasicHeader from '@components/Header/BasicHeader';
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

const SocketTest = () => {
  const [displayList, setDisplayList] = useState<Array<UberType>>(defaultList);
  const [data, setData] = useState<Array<UberType>>([]);
  const [ladder, setLadder] = useState('1');
  const [isLoading, setIsLoading] = useState(true);
  const ws = useRef<WebSocket | null>(null);

  const onChangeLadder = useCallback(
    (_: React.SyntheticEvent, newLadder: string) => {
      setDisplayList(defaultList);
      setLadder(newLadder);
    },
    []
  );

  const disConnect = (mode: number) => {
    if (ws.current) {
      if (mode > 0) {
        ws.current.close();
      }
      console.log('disconnect websocket');
      ws.current = null;
    }
  };

  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket('ws://localhost:3333/ws');
      ws.current.onopen = () => {
        console.log('connect websocket');
      };
      ws.current.onclose = () => {
        disConnect(0);
      };
      ws.current.onerror = (err) => {
        console.log('error: ', err);
        disConnect(1);
      };
      ws.current.onmessage = (evt: MessageEvent) => {
        const data: Array<UberType> = JSON.parse(evt.data);
        setData(data);
      };
      setIsLoading(false);
    }

    return () => {
      if (ws.current) {
        disConnect(1);
      }
    };
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
      <BasicHeader>
        {useMemo(
          () => (
            <Tabs
              value={ladder}
              variant='fullWidth'
              scrollButtons={false}
              onChange={onChangeLadder}
            >
              <Tab value='1' label='Ladder' sx={tabStyle} />
              <Tab value='2' label='Non Ladder' sx={tabStyle} />
            </Tabs>
          ),
          [ladder, onChangeLadder]
        )}
      </BasicHeader>
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

export default SocketTest;
