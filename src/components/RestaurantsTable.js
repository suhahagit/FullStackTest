import React from 'react';
import { observer, inject } from 'mobx-react'
import { useState } from 'react'
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded'
import EditRoundedIcon from '@material-ui/icons/EditRounded'
import AddIcon from '@material-ui/icons/Add'
import { TextField } from '@material-ui/core'
import UpdateRestaurant from './UpdateRestaurant'
import ClipLoader from "react-spinners/ClipLoader";

const RestaurantsTable = (props) => {

    const { restaurants, loader } = props.restaurants
    const [inputValue, setInputValue] = useState('')
    const [currRestaurant, setCurrRestaurant] = useState({ id: '', name: '', type: '', phone: '', location: '' })
    const [open, setOpen] = useState(false)
    const [type, setType] = useState('')

    const restaurantsArr = mapRestaurants((inputValue ? searchName() : null) || restaurants)

    function mapRestaurants(arr) {
        return arr.map(r => createData(r.id, r.name, r.type, r.phone, r.location))
    }

    function createData(id, name, type, phone, location) {
        return { id, name, type, phone, location };
    }

    function searchName() {
        return restaurants.filter(r => r.name.toLowerCase().includes(inputValue.toLowerCase()))
    }

    const handleRemove = (r) => {
        props.restaurants.deleteRestaurant(r.id)
    }

    const handleEdit = (r) => {
        setCurrRestaurant({ id: r.id, name: r.name, type: r.type, phone: r.phone, location: r.location })
        setType('Update')
        setOpen(true)
    }

    const handleAdd = () => {
        setCurrRestaurant({ id: '', name: '', type: '', phone: '', location: '' })
        setType('Add')
        setOpen(true)
    }

    return (
        loader ? <ClipLoader color={'#425D7C'} loading={loader} size={150} />
            :
            <div>
                <TextField id="searchBar" label="Search Restaurant"
                    onChange={({ target }) => setInputValue(target.value)}
                    value={inputValue} />
                <AddIcon onClick={handleAdd} />
                <br /><br />
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell />
                                <TableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {restaurantsArr.map(r => (
                                <TableRow key={(Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase()}>
                                    <TableCell>{r.name}</TableCell>
                                    <TableCell>{r.type}</TableCell>
                                    <TableCell>{r.phone}</TableCell>
                                    <TableCell>{r.location}</TableCell>
                                    <TableCell><EditRoundedIcon onClick={() => handleEdit(r)} /></TableCell>
                                    <TableCell><DeleteOutlineRoundedIcon onClick={() => handleRemove(r)} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                {open && <UpdateRestaurant restaurantInfo={currRestaurant} setOpen={setOpen} type={type} />}
            </div>
    );
};

export default inject("restaurants")(observer(RestaurantsTable));