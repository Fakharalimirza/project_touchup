import { getDocs, collection, query, orderBy } from 'firebase/firestore';
import { unstable_setRequestLocale } from 'next-intl/server';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
};

async function getBookings() {
  const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function getContacts() {
  const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export default async function AdminDashboard({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const bookings = await getBookings();
  const contacts = await getContacts();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold font-headline text-primary">Admin Dashboard</h1>
          {/* Sign Out button removed as backend functionality is disabled */}
        </div>

        <Tabs defaultValue="bookings">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bookings">Booking Requests ({bookings.length})</TabsTrigger>
            <TabsTrigger value="contacts">Contact Messages ({contacts.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Booking Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date / Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking: any) => (
                      <TableRow key={booking.id}>
                        <TableCell>{booking.createdAt.toDate().toLocaleDateString()}</TableCell>
                        <TableCell>
                            <div className="font-medium">{booking.name}</div>
                            <div className="text-sm text-muted-foreground">{booking.email}</div>
                            <div className="text-sm text-muted-foreground">{booking.phone}</div>
                        </TableCell>
                        <TableCell>{booking.service}</TableCell>
                        <TableCell>{new Date(booking.date.seconds * 1000).toLocaleDateString()} at {booking.time}</TableCell>
                        <TableCell>{booking.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contacts.map((contact: any) => (
                    <Card key={contact.id}>
                        <CardHeader>
                            <CardTitle className="text-lg">{contact.subject}</CardTitle>
                             <div className="text-sm text-muted-foreground">
                                <strong>From:</strong> {contact.name} ({contact.email})
                             </div>
                             <div className="text-xs text-muted-foreground">
                                Received on {contact.createdAt.toDate().toLocaleString()}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">{contact.message}</p>
                        </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
