'use client'

import { deleteAuction } from '@/app/actions/auctionActions';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

type Props = {
    id: string
}

export default function DeleteButton({id}: Props) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    function doDelete() {
        setLoading(true);
        deleteAuction(id)
            .then(response => {
                if (response.error) throw response.error;
                router.push('/');
            }).catch(error => {
                toast.error(error.status + ' ' + error.message);
            }).finally(() => setLoading(false));
    }
    
    return (
        <Button color='failure' isProcessing={loading} onClick={doDelete}>
            Delete Auction
        </Button>
    )
}
