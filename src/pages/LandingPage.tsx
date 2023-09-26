import React, { useState, useEffect } from "react";
import { Button, Typography, Grid, Paper, Card, CardContent, CardMedia } from "@mui/material";
import httpClient from "../httpClient";
import { user } from "../types";
import { Link } from "react-router-dom";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import slider1 from "../pageimage/slideimage1.png"
import slider2 from "../pageimage/slideimage2.png"
import slider3 from "../pageimage/slideimage3.png"
import "./slider.css"

const LandingPage: React.FC = () => {
const [user, setUser] = useState<user | null>(null);

const logoutUser = async () => {
    await httpClient.post("//localhost:8000/logout");
    window.location.href = "/";
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//localhost:8000/me");
        setUser(resp.data);
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);

    return (
      <Grid container spacing={0}>
        <Grid item xs={12}>
            <Typography variant="h1" align="center" gutterBottom>
              Grocery Shopping List App
            </Typography>
        </Grid>
        <Grid item xs={12}>
          {user != null ? (
             <div className="card-container">
            <Card elevation={0}>
              <CardContent>
                <Typography variant="h3">Welcome!</Typography>
                <Typography variant="body1" style={{ fontSize: "20px" }} gutterBottom>
                  ID: {user.userid}, Username: {user.username}, Email: {user.email}
                </Typography>
                <Button variant="contained" onClick={logoutUser} size="large" style={{ fontSize: '15px', padding: '10px 15px' }}>
                  Logout
                </Button> | <Link to="/mecart" style={{ textDecoration: "none" }}>
                  <Button variant="contained" color="primary" size="large" style={{ fontSize: '15px', padding: '10px 15px' }}>
                    Your Cart
                  </Button>
                </Link> | <Link to="/showitems" style={{ textDecoration: "none"}}>
                  <Button variant="contained" color="primary" size="large" style={{ fontSize: '15px', padding: '10px 15px' }}>
                    Start Shopping!
                  </Button>
                </Link>
              </CardContent>
            </Card>
            </div>
          ) : (
            <div className="card-container">
            <Card elevation={0}>
              <CardContent>
                <Button variant="contained" color="primary" component={Link} to="/login" size="large" style={{ fontSize: '15px', padding: '10px 15px' }}>
                  Login
                </Button> | <Button variant="contained" color="primary" component={Link} to="/signup" size="large" style={{ fontSize: '15px', padding: '10px 15px' }}>
                  Signup
                </Button> | <Button variant="contained" color="primary" component={Link} to="/showitems" size="large" style={{ fontSize: '15px', padding: '10px 15px' }}>
                  Full Shopping Items
                </Button>
                <Typography variant="body1" paragraph style={{ fontSize: '20px'}}>
                  Please login/signin to start shopping. 
                </Typography>
              </CardContent>
            </Card>
            </div>
          )}
        </Grid>
        <div className="carousel-container">
          <AliceCarousel autoPlay autoPlayInterval= {2000}>
            <img src = {slider1} className="sliderimg" alt = ""></img>
            <img src = {slider2} className="sliderimg" alt = ""></img>
            <img src = {slider3} className="sliderimg" alt = ""></img>
          </AliceCarousel>
        </div>
      </Grid>
    );
  }

  export default LandingPage;