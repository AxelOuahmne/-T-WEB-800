import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function RecipeReviewCard({ hotel }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    };
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {hotel.address.countryCode}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={hotel.name}
                subheader={hotel.iataCode}
            />
            <CardMedia
                component="img"
                height="194"
                image="https://cf.bstatic.com/xdata/images/hotel/square200/403738733.webp?k=a1b1897ed9012a33595a19e82a3dd99a8ed113b6d3b5dd41a615c3ae79264f59&o="
                alt="Paella dish"
            />
            <CardContent>
                {hotel.address && (
                    <Typography variant="body2" color="text.secondary">
                        console.log(hotel.address);
                        <p>Chaîne: {hotel.chainCode}</p>
                        <p>Dupe ID: {hotel.dupeId}</p>
                        <p>Pays: {hotel.address.countryCode}</p>
                        <p>Latitude: {hotel.geoCode.latitude}</p>
                        <p>Longitude: {hotel.geoCode.longitude}</p>
                        <p>Dernière mise à jour: {formatDate(hotel.lastUpdate)}</p>
                    </Typography>
                )}
            </CardContent>


            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        infos Hotels
                    </Typography>

                </CardContent>
            </Collapse>
        </Card>
    );
}
