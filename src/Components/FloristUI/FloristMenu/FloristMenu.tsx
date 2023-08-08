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
import { ChangeEvent, useState } from 'react';

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

const FloristMenu = () => {
    const { data } = useGetAllItemsQuery();
    const [selectedMenu, setSelectedMenu] = useState('');
    const [isMenuCardVisible, setMenuCardVisible] = useState(true);
    const [searchResult, setSearchResult] = useState<Items [] | undefined>([]);
    const [search, setSearch] = useState(false);

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
            setSearch(true)
            const result: Array<Items> | undefined = flowers?.filter(
                flower => flower.item_name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setSearchResult(result)           
        } else if (selectedMenu === 'Игрушки') {
            setSearch(true)
            const result: Array<Items> | undefined = toys?.filter(
                flower => flower.item_name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setSearchResult(result)
        } else if (selectedMenu === 'Фурнитура') {
            setSearch(true)
            const result: Array<Items> | undefined = accessories?.filter(
                flower => flower.item_name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setSearchResult(result)
        } else {
            setSearch(true)
            const result: Array<Items> | undefined = data?.filter(
                flower => flower.item_name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setSearchResult(result)
        }
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
                            />
                        ))
                    }
                </Grid>
            </Container>
            <Container sx={{width: '33%'}}>
                <Cart/>
            </Container>
        </ThemeProvider>
    );
};

export default FloristMenu;
