$(document).ready(function() {
    $("#startCheck").on("click", function() {
        // Start de modale stappen
        questionName();
    });

    function questionName() {
        Swal.fire({
            title: 'Naam van de LP',
            input: 'text',
            inputPlaceholder: 'Vul de naam van de LP in',
            showCancelButton: true,
            confirmButtonText: 'Volgende',
            cancelButtonText: 'Annuleren',
            confirmButtonColor: 'var(--primary)',
            cancelButtonColor: 'var(--accent)',
            background: 'var(--background)',
            color: 'var(--text)',
            preConfirm: (naam) => {
                if (!naam) {
                    toastr.error("Vul een naam in.", '', {
                        closeButton: true,
                        progressBar: true,
                        positionClass: 'toast-top-center',
                        timeOut: '3000',
                        extendedTimeOut: '1000',
                        showEasing: 'swing',
                        hideEasing: 'linear',
                        showMethod: 'fadeIn',
                        hideMethod: 'fadeOut',
                        toastClass: 'toast toast-primary', // Custom class for toast styling
                    });
                    return false;
                }
                return naam;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                questionDate(result.value);
            }
        });
    }

    function questionDate(naam) {
        Swal.fire({
            title: 'Jaartal van de LP',
            input: 'number',
            inputPlaceholder: 'Vul het jaartal in',
            showCancelButton: true,
            confirmButtonText: 'Volgende',
            cancelButtonText: 'Annuleren',
            confirmButtonColor: 'var(--primary)',
            cancelButtonColor: 'var(--accent)',
            background: 'var(--background)',
            color: 'var(--text)',
            preConfirm: (jaartal) => {
                if (!jaartal) {
                    toastr.error("Vul een jaartal in.", '', {
                        closeButton: true,
                        progressBar: true,
                        positionClass: 'toast-top-center',
                        timeOut: '3000',
                        extendedTimeOut: '1000',
                        showEasing: 'swing',
                        hideEasing: 'linear',
                        showMethod: 'fadeIn',
                        hideMethod: 'fadeOut',
                        toastClass: 'toast toast-primary', // Custom class for toast styling
                    });
                    return false;
                }
                return { naam, jaartal };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                questionLimeted(result.value);
            }
        });
    }

    function questionLimeted(data) {
        Swal.fire({
            title: 'Is het een limited edition?',
            input: 'select',
            inputOptions: {
                nee: 'Nee',
                ja: 'Ja'
            },
            showCancelButton: true,
            confirmButtonText: 'Volgende',
            cancelButtonText: 'Annuleren',
            confirmButtonColor: 'var(--primary)',
            cancelButtonColor: 'var(--accent)',
            background: 'var(--background)',
            color: 'var(--text)',
        }).then((result) => {
            if (result.isConfirmed) {
                data.limitedEdition = result.value;
                questionCondition(data);
            }
        });
    }

    function questionCondition(data) {
        Swal.fire({
            title: 'Conditie van de LP',
            text: 'Selecteer de conditiecode van de LP:',
            input: 'select',
            inputOptions: {
                NM: 'NM (Near Mint) - In nieuwstaat',
                'VG+': 'VG+ (Very Good Plus) - Enkele gebruikerssporen en in zeer goede afspeelbare staat',
                VG: 'VG (Very Good) – Wat meer gebruikerssporen en in goede afspeelbare staat',
                'G+': 'G+ (Good Plus) – Behoorlijk wat gebruikerssporen, maar nog steeds goed afspeelbaar'
            },
            showCancelButton: true,
            confirmButtonText: 'Volgende',
            cancelButtonText: 'Annuleren',
            confirmButtonColor: 'var(--primary)',
            cancelButtonColor: 'var(--accent)',
            background: 'var(--background)',
            color: 'var(--text)',
        }).then((result) => {
            if (result.isConfirmed) {
                data.conditiePlaat = result.value;
                questionConditionSleeve(data);
            }
        });
    }

    function questionConditionSleeve(data) {
        Swal.fire({
            title: 'Staat van de albumhoes',
            text: 'Selecteer de conditiecode van de albumhoes:',
            input: 'select',
            inputOptions: {
                NM: 'NM (Near Mint) - In nieuwstaat',
                'VG+': 'VG+ (Very Good Plus) - Enkele gebruikerssporen, lichte slijtage',
                VG: 'VG (Very Good) – Wat meer gebruikerssporen, lichte beschadigingen',
                'G+': 'G+ (Good Plus) – Duidelijke gebruikerssporen, stickers of lichte scheuren'
            },
            showCancelButton: true,
            confirmButtonText: 'Check Zeldzaamheid',
            cancelButtonText: 'Annuleren',
            confirmButtonColor: 'var(--primary)',
            cancelButtonColor: 'var(--accent)',
            background: 'var(--background)',
            color: 'var(--text)',
        }).then((result) => {
            if (result.isConfirmed) {
                data.conditieHoes = result.value;
                resultFunction(data);
            }
        });
    }

    function resultFunction(data) {
        const lookupTable = {
            'ja_NM_NM': 'Zeer Zeldzaam',
            'ja_NM_VG+': 'Zeldzaam en Gewaardeerd',
            'ja_VG+_NM': 'Zeldzaam en Gewaardeerd',
            'ja_VG+_VG+': 'Zeldzaam',
            'ja_VG_VG+': 'Redelijk Zeldzaam',
            'ja_VG_VG': 'Redelijk Zeldzaam',
            'ja_G+_any': 'Minder Zeldzaam',
            'ja_any_G+': 'Minder Zeldzaam',
            'nee_NM_NM': 'Gewaardeerd',
            'nee_VG+_NM': 'Gewaardeerd',
            'nee_NM_VG+': 'Gewaardeerd',
            'nee_VG+_VG+': 'Normaal',
            'nee_VG_VG': 'Normaal',
            'nee_VG_G+': 'Minder Gewaardeerd',
            'nee_G+_any': 'Minder Gewaardeerd',
            'nee_any_G+': 'Minder Gewaardeerd',
        };

        const key = `${data.limitedEdition}_${data.conditiePlaat}_${data.conditieHoes}`;
        const alternateKey = `${data.limitedEdition}_${data.conditiePlaat}_any`; // For cases where only one value matters
        const zeldzaamheid = lookupTable[key] || lookupTable[alternateKey] || 'Normaal';

        Swal.fire({
            title: 'Resultaat',
            text: `De LP "${data.naam}" uit ${data.jaartal} is geclassificeerd als: ${zeldzaamheid}`,
            icon: 'info',
            confirmButtonText: 'OK',
            confirmButtonColor: 'var(--primary)',
            background: 'var(--background)',
            color: 'var(--text)',
        });
    }
});
