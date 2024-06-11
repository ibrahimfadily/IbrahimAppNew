import React, { useState, useCallback } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const CustomDropDownPicker = ({ items, setCarType, setPrice }) => {
    const [value, setValue] = useState();
    const [open, setOpen] = useState(false);

    const onItemPress = useCallback((item) => {
        item.txt = item.label + " ( " + item.price + ' ש"ח )';
        setPrice(item.price);
        setOpen(false);
        setValue(item);
    }, [setPrice, setOpen, setValue]);

    const PickerItem = React.memo(({ item }) => (
        <TouchableOpacity
            style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
            }}
            onPress={() => onItemPress(item)}
        >
            <Text style={{ color: 'black' }}>
                {item.label} <Text style={{ fontWeight: 'bold' }}>{item.price}</Text>
            </Text>
        </TouchableOpacity>
    ));

    return (
        <DropDownPicker
            items={items}
            open={open}
            setOpen={setOpen}
            labelStyle={{ fontSize: 18 }}
            containerStyle={{ height: 40 }}
            style={{ backgroundColor: '#fafafa', marginBottom: 10 }}
            itemStyle={{ justifyContent: 'flex-start' }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={(item) => {
                setCarType(item.value);
                setPrice(item.price);
            }}
            placeholder={value?.txt || "בחר סוג הרכב"}
            renderListItem={({ item }) => <PickerItem item={item} />}
            keyExtractor={(item) => item.value.toString()}
        />
    );
};

export default CustomDropDownPicker;
