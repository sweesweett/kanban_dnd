import styled from 'styled-components';
import Input from './Input';
import { graphqlFetcher, Querykeys } from '../../queryClient';
import { useQuery } from 'react-query';
import { GET_MANAGER } from '../../graphql/lists';
import { Managers } from '../../types/lists';
import { ChangeEvent, useState, useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';

const SearchManager = ({ defaultValue }: { defaultValue: string | undefined | null }) => {
  const [searchValue, setSearchValue] = useState(defaultValue || '');
  const debounce = useDebounce(searchValue);
  const { data, refetch } = useQuery<Managers>(
    Querykeys.MANAGER,
    () => graphqlFetcher(GET_MANAGER, { searchString: debounce }),
    {
      enabled: !!searchValue,
    },
  );
  useEffect(() => {
    if (debounce) {
      refetch();
    }
  }, [debounce, refetch]);
  return (
    <SearchManagerWrapper>
      <Input
        type="text"
        name="manager"
        label="담당자"
        options={{
          placeholder: '담당자 찾기',
          value: searchValue,
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            setSearchValue(e.target.value);
          },
        }}
      />

      <DropUl>
        {!data && searchValue && <span>검색 결과 없음</span>}
        {data?.managers.map((manager) => (
          <DropLi
            key={manager.id}
            onClick={() => {
              setSearchValue(manager.name);
            }}
          >
            {manager.name}
          </DropLi>
        ))}
      </DropUl>
    </SearchManagerWrapper>
  );
};

const SearchManagerWrapper = styled.div``;
const DropUl = styled.ul`
  margin-top: 12px;
  height: 40px;
  width: 100%;
  overflow-x: auto;
`;
const DropLi = styled.li`
  display: inline-block;
  margin-right: 8px;
  padding: 4px;
  border-radius: 15px;
  font-size: 14px;
  background-color: white;
  font-weight: 500;
  border: 3px solid #fed6e3;
  cursor: pointer;
  :hover,
  :active {
    border: 3px solid #ffb2cb;
  }
`;
export default SearchManager;
