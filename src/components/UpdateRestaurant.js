import React, { useState } from 'react'
import { observer, inject } from 'mobx-react'
import { TextField, Popover, Button } from '@material-ui/core';

function UpdateRestaurant(props) {

    const { id, name, type, phone, location } = props.restaurantInfo
    const [currRestaurant, setCurrRestaurant] = useState({ id, name, type, phone, location })

    const handleClose = () => {
        props.setOpen(false)
    };

    const update = () => {
        const { id, name, type, phone, location } = currRestaurant
        if (name && type && phone && location) {
            props.type === 'Update' ?
                props.restaurants.updateRestaurant(id, name, type, phone, location)
                : props.restaurants.addRestaurant(name, type, phone, location)
            handleClose()
        } else {
            alert('Missing Fields')
        }
    }

    const updateInput = (event) => {
        const { id, value } = event.target
        setCurrRestaurant({ ...currRestaurant, [id]: value })
    }

    return (
        <div>
            <Popover
                open={true}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 350, left: 700 }}
                anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                transformOrigin={{ vertical: 'center', horizontal: 'center' }}
            >
                <div className="update" >
                    <TextField
                        required label="Name"
                        value={currRestaurant.name}
                        variant="outlined"
                        id="name"
                        onChange={updateInput}
                    />
                    <TextField
                        required label="Type"
                        value={currRestaurant.type}
                        variant="outlined"
                        id="type"
                        onChange={updateInput}
                    />
                    <TextField
                        required label="Phone"
                        value={currRestaurant.phone}
                        variant="outlined"
                        id="phone"
                        onChange={updateInput}
                    />
                    <TextField
                        required label="Location"
                        value={currRestaurant.location}
                        variant="outlined"
                        id="location"
                        onChange={updateInput}
                    />
                    <Button size="small" variant="contained" color="primary" onClick={update}>
                        {props.type}
                    </Button>
                </div>
            </Popover>
        </div>
    )
}

export default inject("restaurants")(observer(UpdateRestaurant))