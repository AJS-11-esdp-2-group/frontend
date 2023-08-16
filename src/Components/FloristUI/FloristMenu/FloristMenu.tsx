import {Items} from '../../../interfaces/Items';
import ItemsCard from './Items';
import Cart from './Cart';
import MenuCard from '../../UI/Layout/Card/CardMenu';
import { GlobalTheme } from '../../..';
import { useGetAllItemsQuery } from '../../../Store/services/items';
import { ThemeProvider } from '@emotion/react';
import { Button, Container, Grid, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, useState, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router';
import { useGetBouquetsOnBasketQuery } from '../../../Store/services/availableBouquets';
import { IAvailableBouquet, IAvailableBouquets } from '../../../interfaces/IAvailableBouquets';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    borderBottom: `2px solid ${theme.palette.divider}`,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    right: 1,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const colors = ['#04a96d', '#ef466f', 'purple', 'blue', '#da5a29'];
const menuName = ['Цветы', 'Игрушки', 'Фурнитура', 'Рецепты', 'Услуги'];

export interface ItemsOnCart extends Items {
    qty: number;
}

const FloristMenu = () => {
    const { data } = useGetAllItemsQuery();
    const bouquets = useGetBouquetsOnBasketQuery().data as IAvailableBouquets [] | [];
    const refetch = useGetBouquetsOnBasketQuery().refetch;
    const [selectedMenu, setSelectedMenu] = useState('');
    const [isMenuCardVisible, setMenuCardVisible] = useState(true);
    const [searchResult, setSearchResult] = useState<Items [] | undefined>([]);
    const [search, setSearch] = useState(false);
    const [items, setItems] = useState<ItemsOnCart []>([]);
    const [basketBouquets, setBasketBouquets] = useState<IAvailableBouquet [] | []>([]);
    const [activeItemIndex, setActiveItemIdex] = useState<number | null>(null);

    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        refetch();
        setBasketBouquets(prev => bouquets);
    }, [bouquets, refetch]);

    const flowers = data?.filter((flower) => Number(flower.id_category) === 1);
    const toys = data?.filter((flower) => Number(flower.id_category) === 2);
    const accessories = data?.filter((flower) => Number(flower.id_category) === 3);

    const returnMenu = () => {
        setMenuCardVisible(true);
        setSelectedMenu('');
        setSearch(false);
    };
    
    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if(selectedMenu === 'Цветы') {
            setSearch(true);
            setMenuCardVisible(false);
            const result: Array<Items> | undefined = flowers?.filter(
                flower => flower.item_name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setSearchResult(result)           
        } else if (selectedMenu === 'Игрушки') {
            setSearch(true);
            setMenuCardVisible(false);
            const result: Array<Items> | undefined = toys?.filter(
                flower => flower.item_name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setSearchResult(result)
        } else if (selectedMenu === 'Фурнитура') {
            setSearch(true);
            setMenuCardVisible(false);
            const result: Array<Items> | undefined = accessories?.filter(
                flower => flower.item_name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setSearchResult(result)
        } else {
            setSearch(true);
            setMenuCardVisible(false);
            const result: Array<Items> | undefined = data?.filter(
                flower => flower.item_name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setSearchResult(result)
        }
    };

    const cardClickHandler = (item: Items) => {
        const copyItems: ItemsOnCart [] = [...items];
        if(copyItems.length > 0) {
            let equalStatus = false;
            copyItems.forEach((itm, index) => {
                if(item.item_name === itm.item_name) {
                    equalStatus = true;
                    copyItems[index].qty++;
                }
            });
            if(equalStatus) {
                setItems(copyItems);
            } else {
                const copyItem = {...item, qty: 1};
                copyItems.push(copyItem);
                setItems(copyItems);
                setActiveItemIdex(copyItems.length -1);
            }
        } else {
            const copyItem = {...item, qty: 1};
            copyItems.push(copyItem);
            setItems(copyItems);
            setActiveItemIdex(copyItems.length -1);
        }
    };

    const navigateToShowcase = () => {
        navigate({pathname: '/sendshowcase', search: `?params=${JSON.stringify(items)}`});
    };

    const removeItemHandler = (index: number) => {
        const copyItems = [...items];
        copyItems.splice(index, 1);
        setItems(prev => copyItems);
    };

    const increaseItemHandler = (index: number) => {
        const copyItems = [...items];
        copyItems[index].qty ++;
        setItems(prev=> copyItems);
    };

    const decreaseItemHandler = (index: number) => {
        const copyItems = [...items];
        if(copyItems[index].qty > 1){
            copyItems[index].qty --;
            setItems(prev=> copyItems);
        }
    };

    const changePriceHandler = (index: number, e:ChangeEvent<HTMLInputElement>) => {
        const copyItems = [...items];
        copyItems[index].price = parseInt(e.target.value);
        setItems(prev => copyItems);
    };

    const activeItemHandler = (index:number) => {
        if(activeItemIndex === index) {
            setActiveItemIdex(null);
            return
        }
        setActiveItemIdex(index);
    };

    const bouquetPriceChangeHandler = (index: number, e:ChangeEvent<HTMLInputElement> ) => {
        const copyBasket = [...basketBouquets];
        copyBasket[index].total_sum = parseInt(e.target.value);
        setBasketBouquets(prev => copyBasket);
    };

    return (
        <ThemeProvider theme={GlobalTheme}>
            <Container sx={{ width: '60%', alignItems: 'flex-start', margin: 0 }}>
                <Grid container>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase 
                            placeholder="Название" 
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={inputChangeHandler} 
                        />
                    </Search>
                </Grid>

                <Grid container>
                    {!isMenuCardVisible && <Button onClick={() => returnMenu()}>Назад</Button>}
                    {isMenuCardVisible && !search &&
                        menuName.map((name, index) => (
                            <Grid item sx={{ margin: 1 }} key={name}>
                                <MenuCard
                                    onclick={() => {
                                        setSelectedMenu(name);
                                        setMenuCardVisible(false);
                                    }}
                                    menuName={name}
                                    color={colors[index % colors.length]}
                                />
                            </Grid>
                        ))}
                </Grid>
                <Grid container>
                    {selectedMenu === 'Цветы' && !search &&
                        flowers &&
                        flowers.map((flower) => (
                            <ItemsCard
                                key={flower.id}
                                id={flower.id}
                                item_name={flower.item_name}
                                price={flower.price}
                                image_small={flower.image_small}
                                onClickCard={()=>cardClickHandler(flower)}
                            />
                        ))}
                    {selectedMenu === 'Игрушки' && !search &&
                        toys &&
                        toys.map((toy) => (
                            <ItemsCard
                                key={toy.id}
                                id={toy.id}
                                item_name={toy.item_name}
                                price={toy.price}
                                image_small={toy.image_small}
                                onClickCard={()=>cardClickHandler(toy)}
                            />
                        ))}
                    {selectedMenu === 'Фурнитура' && !search &&
                        accessories &&
                        accessories.map((accessory) => (
                            <ItemsCard
                                key={accessory.id}
                                id={accessory.id}
                                item_name={accessory.item_name}
                                price={accessory.price}
                                image_small={accessory.image_small}
                                onClickCard={()=>cardClickHandler(accessory)}
                            />
                        ))}
                    {search &&  searchResult !== undefined && searchResult.length > 0 
                        && searchResult.map(result => (
                            <ItemsCard
                                key={result.id}
                                id={result.id}
                                item_name={result.item_name}
                                price={result.price}
                                image_small={result.image_small}
                                onClickCard={()=>cardClickHandler(result)}
                            />
                        ))
                    }
                </Grid>
            </Container>
            <Container sx={{width: '33%'}}>
                <Cart
                    items={items} 
                    clickNavigate={navigateToShowcase}
                    removeItem={removeItemHandler}
                    increaseItem={increaseItemHandler}
                    decreaseItem={decreaseItemHandler}
                    changePrice={changePriceHandler}
                    activeItem={activeItemHandler}
                    activeIndex={activeItemIndex}
                    bouquets={basketBouquets}
                    bouquetActualPriceChange={bouquetPriceChangeHandler}
                />
            </Container>
        </ThemeProvider>
    );
};

export default FloristMenu;
