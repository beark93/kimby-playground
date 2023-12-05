import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';

import { Grid, Box, TextField, Button } from '@mui/material';
import { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import BasicHeader from '@components/Header/BasicHeader';
import MiddleTypography from '@components/Typography/MiddleTypography';
import PokemonCard from '@components/Card/PokemonCard';
import PokemonSkeleton from '@components/Skeleton/PokemonSkeleton';
import LoadingModal from '@components/Modal/LoadingModal';
import PokemonInfoModal from '@components/Modal/PokemonInfoModal';

import { getPokeList } from '@api/poke';
import { PokeType } from '@utils/poke';
import pokeJson from 'src/assets/json/poke_name.json';

const InputBox = React.memo(
  styled(Box)<BoxProps>(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }))
);

const ContainerBox = React.memo(
  styled(Box)<BoxProps>(({ theme }) => ({
    height: 'calc(var(--vh, 1vh) * 75)',
    [theme.breakpoints.up('max')]: {
      height: '75vh',
    },
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-thumb': {
      position: 'absolute',
      left: '0px',
      background: '#666666',
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(220, 220, 220, 0.4)',
    },
  }))
);

const limit = 40;

/*============================== Header ==============================*/
const Header = () => {
  return (
    <BasicHeader>
      <MiddleTypography
        fontSize={{
          zero: '1.2rem',
          max: 'h4.fontSize',
        }}
      >
        Pokemon
      </MiddleTypography>
    </BasicHeader>
  );
};
const MemoizedHeader = React.memo(Header);

/*============================== Search Area ==============================*/
const SearchArea = ({ onClick }: { onClick: (search: string) => void }) => {
  const [search, setSearch] = useState('');

  const onChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    []
  );

  const onKeyDownSearch = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.keyCode === 13) {
        onClick(search);
      }
    },
    [search, onClick]
  );

  const onClickSearch = useCallback(() => {
    onClick(search);
  }, [onClick, search]);

  return (
    <InputBox mb={2}>
      <TextField
        label='번호 or 이름'
        size='small'
        variant='outlined'
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDownSearch}
      />
      <Button
        variant='outlined'
        color='inherit'
        sx={{ ml: 1 }}
        onClick={onClickSearch}
      >
        검색
      </Button>
    </InputBox>
  );
};
const MemoizedSearchArea = React.memo(SearchArea);

/*============================== Pokemon Skeleton ==============================*/
const PokemonSkeletonGrid = () => {
  return new Array(4).fill(0).map((_, idx) => (
    <Grid item container key={`pokemon-skeleton-${idx}`} zero={3}>
      <PokemonSkeleton />
    </Grid>
  ));
};
const MemoizedPokemonSkeletonGrid = React.memo(PokemonSkeletonGrid);

/*============================== Pokemon 개별 카드 ==============================*/
const PokemonCardGrid = ({
  pokemon,
  onClick,
}: {
  pokemon: PokeType;
  onClick: (id: string) => void;
}) => {
  return (
    <Grid item key={`pokemon-${pokemon.name}`} zero={3}>
      <PokemonCard pokemon={pokemon} onClick={onClick} />
    </Grid>
  );
};
const MemoizedPokemonCardGrid = React.memo(PokemonCardGrid);

/*============================== Pokemon Card List ==============================*/
const PokemonCardList = ({ onClick }: { onClick: (id: string) => void }) => {
  const [displayList, setDisplayList] = useState<PokeType[]>([]);
  const [isInit, setIsInit] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const [openLoading, setOpenLoading] = useState(false);

  const offset = useRef(0);
  const root = useRef<HTMLInputElement>(null);
  const target = useRef<HTMLInputElement>(null);

  // pokeApi 호출
  const callPokeApi = (offet: number, limit: number) =>
    getPokeList(offet, limit)
      .then((res) => {
        setDisplayList((state) => [...state, ...res.data.items]);
        if (!res.data.next) {
          setIsEnd(true);
        }
        setIsInit(true);
        setOpenLoading(false);
      })
      .catch(() => {
        setIsEnd(true);
        setOpenLoading(false);
      });

  useEffect(() => {
    callPokeApi(offset.current, limit);
  }, []);

  // infinit Scroll 컨트롤
  const handleObserver = useCallback(async (entries: any) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setOpenLoading(true);
      offset.current += limit;
      callPokeApi(offset.current, limit);
    }
  }, []);

  const options = useMemo(
    () => ({
      root: root.current,
      rootMargin: '5px',
      threshold: 1.0,
    }),
    []
  );

  useEffect(() => {
    if (isInit && !isEnd) {
      const observer = new IntersectionObserver(handleObserver, options);
      if (target.current) observer.observe(target.current);
      return () => observer.disconnect();
    }
  }, [handleObserver, isEnd, isInit, options]);

  return (
    <ContainerBox ref={root}>
      <Grid container spacing={4}>
        {!isInit ? (
          <MemoizedPokemonSkeletonGrid />
        ) : (
          displayList.map((it) => (
            <MemoizedPokemonCardGrid
              key={`pokemon-${it.name}`}
              pokemon={it}
              onClick={onClick}
            />
          ))
        )}
      </Grid>
      <div style={{ marginBottom: '5px' }} ref={target}></div>
      <LoadingModal open={openLoading} />
    </ContainerBox>
  );
};
const MemoizedPokemonCardList = React.memo(PokemonCardList);

/*============================== Pokemon Area ==============================*/
const PokemonArea = () => {
  const [openPokemonInfo, setOpenPokemonInfo] = useState(false);
  const [infoPokeId, setInfoPokeId] = useState('');

  const onOpenPokeModal = useCallback((id: string) => {
    setInfoPokeId(id);
    setOpenPokemonInfo(true);
  }, []);

  const onClosePokeModal = useCallback(() => {
    setInfoPokeId('');
    setOpenPokemonInfo(false);
  }, []);

  const handleSearch = useCallback(
    (search: string) => {
      if (!search) {
        alert('검색어를 입력해 주세요.');
        return;
      }

      let id = search;
      if (!parseInt(search)) {
        const filteredJson = pokeJson.filter((it) => it.name === search);

        if (filteredJson.length > 0) {
          id = filteredJson[0].pokemon_species_id.toString();
        }
        onOpenPokeModal(id.toString());
      } else {
        onOpenPokeModal(id);
      }
    },
    [onOpenPokeModal]
  );

  return (
    <>
      <MemoizedSearchArea onClick={handleSearch} />
      <MemoizedPokemonCardList onClick={onOpenPokeModal} />
      <PokemonInfoModal
        open={openPokemonInfo}
        id={infoPokeId}
        onClose={onClosePokeModal}
      />
    </>
  );
};
const MemoizedPokemonArea = React.memo(PokemonArea);

/*============================== 상위 컴포넌트 ==============================*/
const PokemonList = () => {
  return (
    <>
      <MemoizedHeader />
      <MemoizedPokemonArea />
    </>
  );
};

export default PokemonList;
