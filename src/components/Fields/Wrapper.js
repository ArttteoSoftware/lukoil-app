import React, { Fragment } from 'react';
import { isEmpty } from 'lodash';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
const InputWrapper = ({ children, form, field, label }) => {
	return (
		<Fragment>
			<View>
				{/* {label && <Text>{label}</Text>} */}
				{children}
			</View>
			{/* {form.touched[field.name] && form.errors[field.name]?.length ? form.errors[field.name].map(error => (
				error.message ? (
						<Text style={{ color: '#d61f1f' }}>
							{error.message}
						</Text>) : null
			)) : null} */}
		</Fragment>
	)
};

export default InputWrapper;