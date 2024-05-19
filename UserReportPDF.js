import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const UserReportPDF = ({ users }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>User Report</Text>
        {users.map((user, index) => (
          <View key={index} style={styles.user}>
            <Text>{`Name: ${user.name}`}</Text>
            <Text>{`Email: ${user.email}`}</Text>
            <Text>{`Mobile: ${user.mobile}`}</Text>
            <Text>{`Role: ${user.role}`}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    margin: 10,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  user: {
    marginBottom: 10,
  },
});

export default UserReportPDF;
