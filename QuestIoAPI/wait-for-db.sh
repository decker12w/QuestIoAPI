#!/bin/sh

# Script para esperar o banco de dados estar pronto antes de continuar

set -e

host="$1"
port="$2"
shift 2
cmd="$@"

until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$host" -p "$port" -U "$POSTGRES_USER" -c '\q'; do
  >&2 echo "Banco de dados está inacessível - esperando..."
  sleep 1
done

>&2 echo "Banco de dados está pronto - continuando com o comando"
exec $cmd
